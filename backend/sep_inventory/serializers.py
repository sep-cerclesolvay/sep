from rest_framework import serializers
from .models import Entry, Pack, PaymentMethod, Product, Sale, SaleItem


class ProductSerializer(serializers.ModelSerializer):
    quantity = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'buy_price', 'sell_price', 'quantity')


class ReadOnlyPackSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Pack
        fields = ('id', 'name', 'products')


class PackSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pack
        fields = ('id', 'name', 'products')


class ReadOnlyEntryProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'buy_price', 'sell_price')


class ReadOnlyEntrySerializer(serializers.ModelSerializer):
    product = ReadOnlyEntryProductSerializer(read_only=True)

    class Meta:
        model = Entry
        fields = ('id', 'quantity', 'created_date', 'updated_date', 'product')


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ('id', 'name')


class ReadOnlySaleItemProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ('id', 'name', 'sell_price')


class ReadOnlySaleItemSerializer(serializers.ModelSerializer):
    product = ReadOnlySaleItemProductSerializer(read_only=True)

    class Meta:
        model = SaleItem
        fields = ('id', 'quantity', 'product')


class ReadOnlySaleSerializer(serializers.ModelSerializer):
    payment_method = PaymentMethodSerializer(read_only=True)
    items = ReadOnlySaleItemSerializer(
        many=True, read_only=True, source='sale_to_product')

    class Meta:
        model = Sale
        depth = 1
        fields = ('id', 'created_date', 'updated_date',
                  'payment_method', 'total', 'items')
