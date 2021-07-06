from django.db import models
from django.db.models.deletion import RESTRICT


class Product(models.Model):
    name = models.CharField(max_length=64)
    buy_price = models.DecimalField(decimal_places=3, max_digits=6)
    sell_price = models.DecimalField(decimal_places=3, max_digits=6)
    quantity = models.SmallIntegerField()

    def __str__(self) -> str:
        return f'{self.name}'


class Pack(models.Model):
    name = models.CharField(max_length=64)
    products = models.ManyToManyField('Product')

    def __str__(self) -> str:
        return f'{self.name}'


class Entry(models.Model):
    class Meta:
        verbose_name_plural = "entries"
    product = models.ForeignKey('Product', on_delete=RESTRICT)
    quantity = models.SmallIntegerField()
    created_date = models.DateTimeField()
    updated_date = models.DateTimeField(blank=True, null=True)
    deleted_date = models.DateTimeField(blank=True, null=True)

    def __str__(self) -> str:
        return f'{self.quantity} {self.product}'


class PaymentMethod(models.Model):
    name = models.CharField(max_length=24)

    def __str__(self) -> str:
        return f'{self.name}'


class Sale(models.Model):
    payment_method = models.ForeignKey('PaymentMethod', on_delete=RESTRICT)
    items = models.ManyToManyField('Product', through='SaleItem')
    created_date = models.DateTimeField()
    updated_date = models.DateTimeField(blank=True, null=True)
    deleted_date = models.DateTimeField(blank=True, null=True)

    def __str__(self) -> str:
        date = self.created_date
        if self.updated_date is not None:
            date = self.updated_date
        nb_of_items = self.items.count()
        items_name = 'items'
        if nb_of_items < 2:
            items_name = 'item'
        return f'Vente {self.id}: {date} {nb_of_items} {items_name}'


class SaleItem(models.Model):
    product = models.ForeignKey('Product', on_delete=RESTRICT)
    sale = models.ForeignKey('Sale', on_delete=RESTRICT)
    quantity = models.SmallIntegerField()

    def __str__(self) -> str:
        return f'Vente {self.sale.id} - {self.product}'