from rest_framework import serializers
from .models import Pack, PaymentMethod, Product


class ProductSerializer(serializers.ModelSerializer):
    quantity = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'buy_price', 'sell_price', 'quantity')


class ReadOnlyPackSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Pack
        fields = ('id', 'name', 'products')


class PackSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pack
        fields = ('id', 'name', 'products')


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ('id', 'name')
