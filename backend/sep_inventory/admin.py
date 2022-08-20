from django.contrib import admin
from django.db.models import Count, Value
from django.db.models.functions import Coalesce
from django.urls import reverse
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _, ngettext_lazy
from admin_plus import TabularInline

from .models import Product, Pack, Entry, PaymentMethod, Sale, SaleItem


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_display = ('name', 'quantity', 'buy_price', 'sell_price')
    # list_filter = ('pack',)
    readonly_fields = ('quantity',)


class ProductInline(TabularInline):
    model = Pack.products.through

    def get_inline_count(self, obj):
        return obj.products.count()


@admin.register(Pack)
class PackAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_display = ('__str__', 'product_count')
    exclude = ('products',)
    inlines = [
        ProductInline,
    ]

    @admin.display(description=_('number of products'), ordering='product_count')
    def product_count(self, obj):
        return format_html(
            '<a  href="{0}?pack__id__exact={1}">{2}</a>&nbsp;',
            reverse('admin:sep_inventory_product_changelist'),
            obj.id,
            ngettext_lazy(
                '%(count)s product', '%(count)s products', obj.product_count
            ) % {'count': obj.product_count}
        )

    def get_queryset(self, request):
        """Use this so we can annotate with additional info."""

        qs = super(PackAdmin, self).get_queryset(request)
        return qs.annotate(product_count=Coalesce(Count('products'), Value(0)))


@admin.register(PaymentMethod)
class PaymentMethodAdmin(admin.ModelAdmin):
    search_fields = ('name',)


class DatedModelAdmin(admin.ModelAdmin):
    def get_fields(self, request, obj=None, **kwargs):
        fields = super().get_fields(request, obj, **kwargs)
        fields.remove('deleted_date')
        fields.append('deleted_date')
        return fields


@admin.register(Entry)
class EntryAdmin(DatedModelAdmin):
    search_fields = ('product__name',)
    list_display = ('id', 'product', 'quantity', 'created_date',
                    'updated_date', 'deleted_date')
    readonly_fields = ('created_date', 'updated_date')


class SaleItemInline(TabularInline):
    model = SaleItem

    def get_inline_count(self, obj):
        return obj.items.count()


@admin.register(Sale)
class SaleAdmin(DatedModelAdmin):
    search_fields = ('id', 'sale_to_product__product__name')
    list_display = ('id', 'total', 'payment_method', 'created_date',
                    'updated_date', 'deleted_date')
    readonly_fields = ('total',
                       'created_date', 'updated_date')
    inlines = [
        SaleItemInline,
    ]

    def get_queryset(self, request):
        """Use this so we can annotate with additional info."""

        qs = super(SaleAdmin, self).get_queryset(request)
        return qs.annotate(product_count=Coalesce(Count('sale_to_product'), Value(0)))


# @admin.register(SaleItem)
# class SaleItemAdmin(admin.ModelAdmin):
#     search_fields = ('sale__id', 'product__name')
#     list_display = ('id', 'sale', 'product', 'quantity')
