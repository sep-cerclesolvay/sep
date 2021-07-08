from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    quantity = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = ('url', 'id', 'name', 'buy_price', 'sell_price', 'quantity')
