from django.contrib import admin
from .models import Product, Pack, Entry, PaymentMethod, Sale, SaleItem


class ProductAdmin(admin.ModelAdmin):
    readonly_fields = ('quantity',)


admin.site.register(Product, ProductAdmin)
admin.site.register(Pack)
admin.site.register(Entry)
admin.site.register(PaymentMethod)
admin.site.register(Sale)
admin.site.register(SaleItem)
