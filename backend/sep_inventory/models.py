import decimal
from django.db import models
from django.db.models import Sum
from django.db.models.deletion import RESTRICT
from django.db.models.expressions import F
from django.utils.translation import gettext_lazy as _
from django.contrib import admin


class Product(models.Model):
    class Meta:
        verbose_name = _('product')
        verbose_name_plural = _('products')

    name = models.CharField(_('name'), max_length=64)
    buy_price = models.DecimalField(
        _('purchase price'), decimal_places=3, max_digits=6)
    sell_price = models.DecimalField(
        _('selling price'), decimal_places=3, max_digits=6)

    @property
    @admin.display(description=_('quantity'), ordering='qty')
    def quantity(self):
        entries_sum = Entry.objects.filter(
            product=self,
            deleted_date__isnull=True
        ).aggregate(
            total=Sum('quantity')
        )['total'] or 0

        sales_sum = SaleItem.objects.filter(
            product=self,
            sale__deleted_date__isnull=True
        ).aggregate(
            total=Sum('quantity')
        )['total'] or 0

        return entries_sum - sales_sum

    def __str__(self) -> str:
        return f'{self.name}'


class Pack(models.Model):
    class Meta:
        verbose_name = _('pack')
        verbose_name_plural = _('packs')

    name = models.CharField(_('name'), max_length=64)
    products = models.ManyToManyField(
        'Product',  through='PackItem', verbose_name=_('products'))

    def __str__(self) -> str:
        return f'{self.name}'


class PackItem(models.Model):
    class Meta:
        verbose_name = _('pack item')
        verbose_name_plural = _('pack items')
        unique_together = ('pack', 'product')

    pack = models.ForeignKey(
        'Pack', on_delete=RESTRICT, verbose_name=_('pack'))
    product = models.ForeignKey(
        'Product', on_delete=RESTRICT, verbose_name=_('product'))

    def __str__(self) -> str:
        return _('"%(product)s" in the "%(pack)s" pack') % {'pack': self.pack, 'product': self.product}


class Entry(models.Model):
    class Meta:
        verbose_name = _('entry')
        verbose_name_plural = _('entries')

    product = models.ForeignKey(
        'Product', on_delete=RESTRICT, verbose_name=_('product'))
    quantity = models.SmallIntegerField(_('quantity'))
    created_date = models.DateTimeField(_('creation date'), auto_now_add=True)
    updated_date = models.DateTimeField(_('modification date'), auto_now=True)
    deleted_date = models.DateTimeField(
        _('deletion date'), blank=True, null=True)

    def __str__(self) -> str:
        return f'{self.quantity} {self.product}'


class PaymentMethod(models.Model):
    class Meta:
        verbose_name = _('payment method')
        verbose_name_plural = _('payment methods')

    name = models.CharField(_('name'), max_length=24)

    def __str__(self) -> str:
        return f'{self.name}'


class Sale(models.Model):
    class Meta:
        verbose_name = _('sale')
        verbose_name_plural = _('sales')

    payment_method = models.ForeignKey(
        'PaymentMethod', on_delete=RESTRICT, verbose_name=_('payment method'))
    items = models.ManyToManyField('Product', through='SaleItem')
    created_date = models.DateTimeField(_('creation date'), auto_now_add=True)
    updated_date = models.DateTimeField(_('modification date'), auto_now=True)
    deleted_date = models.DateTimeField(
        _('deletion date'), blank=True, null=True)

    @property
    @admin.display(description=_('total'))
    def total(self):
        total = SaleItem.objects.filter(
            sale=self).annotate(item_total=F('quantity') * F('product__sell_price')).aggregate(total=Sum('item_total'))['total']
        if total == None:
            total = decimal.Decimal('0.000')

        return str(total)

    def __str__(self) -> str:
        return _('Sale %(id)s') % {'id': self.id}


class SaleItem(models.Model):
    class Meta:
        verbose_name = _('sale item')
        verbose_name_plural = _('sale items')
        unique_together = ('product', 'sale')

    product = models.ForeignKey(
        'Product', on_delete=RESTRICT, related_name='product_to_sale', verbose_name=_('product'))
    sale = models.ForeignKey('Sale', on_delete=RESTRICT,
                             related_name='sale_to_product', verbose_name=_('sale'))
    quantity = models.SmallIntegerField(_('quantity'))

    def __str__(self) -> str:
        return _('Sale %(id)s - %(product)s x%(quantity)s') % {'id': self.sale.id, 'product': self.product, 'quantity': self.quantity}
