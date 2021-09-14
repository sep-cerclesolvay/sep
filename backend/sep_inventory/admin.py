from django.contrib import admin
from .models import Product, Pack, Entry, PaymentMethod, Sale, SaleItem


class ProductAdmin(admin.ModelAdmin):
    readonly_fields = ('quantity',)


class EntryAdmin(admin.ModelAdmin):
    readonly_fields = ('created_date', 'updated_date')


class SaleAdmin(admin.ModelAdmin):
    readonly_fields = ('total', 'created_date', 'updated_date')


admin.site.register(Product, ProductAdmin)
admin.site.register(Pack)
admin.site.register(Entry, EntryAdmin)
admin.site.register(PaymentMethod)
admin.site.register(Sale, SaleAdmin)
admin.site.register(SaleItem)
