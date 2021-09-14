from rest_framework import serializers
from .models import Entry, Pack, PaymentMethod, Product, Sale, SaleItem


class ProductSerializer(serializers.ModelSerializer):
    quantity = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'buy_price', 'sell_price', 'quantity')


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ('id', 'name')


class ReadPackSerializer(ProductSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Pack
        fields = ('id', 'name', 'products')


class WritePackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pack
        fields = ('id', 'name', 'products')


class ReadEntryProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'buy_price', 'sell_price')


class ReadEntrySerializer(serializers.ModelSerializer):
    product = ReadEntryProductSerializer(read_only=True)

    class Meta:
        model = Entry
        fields = ('id', 'quantity', 'created_date', 'updated_date', 'product')


class WriteEntrySerializer(serializers.ModelSerializer):

    class Meta:
        model = Entry
        fields = ('id', 'quantity', 'product')


class ReadSaleItemProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ('id', 'name', 'sell_price')


class ReadSaleItemSerializer(serializers.ModelSerializer):
    product = ReadSaleItemProductSerializer(read_only=True)

    class Meta:
        model = SaleItem
        fields = ('id', 'quantity', 'product')


class ReadSaleSerializer(serializers.ModelSerializer):
    payment_method = PaymentMethodSerializer(read_only=True)
    items = ReadSaleItemSerializer(
        many=True, read_only=True, source='sale_to_product')

    class Meta:
        model = Sale
        depth = 1
        fields = ('id', 'created_date', 'updated_date',
                  'payment_method', 'total', 'items')


class WriteSaleItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaleItem
        fields = ('quantity', 'product')


class WriteSaleSerializer(serializers.ModelSerializer):
    items = WriteSaleItemSerializer(many=True, source='sale_to_product')

    class Meta:
        model = Sale
        fields = ('id', 'payment_method', 'items')

    def create(self, validated_data):
        items_data = validated_data.pop('sale_to_product')
        sale = Sale.objects.create(**validated_data)
        for item_data in items_data:
            self.create_item(sale, item_data)
        return sale

    def create_item(self, sale, item_data):
        SaleItem.objects.create(sale=sale, **item_data)

    def update(self, instance, validated_data):
        instance.payment_method = validated_data.get(
            'payment_method', instance.payment_method)
        instance.save()

        items_data = validated_data.pop('sale_to_product', None)

        if items_data != None:
            items = instance.sale_to_product.all()
            for item in items:
                item.delete()
            for item_data in items_data:
                self.create_item(instance, item_data)
        return instance

    def validate(self, attrs):
        ret = super().validate(attrs)

        items = attrs.get('sale_to_product')

        if items == []:
            raise serializers.ValidationError('items can not be empty')

        if items != None:
            for item in items:
                if 'quantity' not in item:
                    raise serializers.ValidationError(
                        'quantity missing in one of the items')
                if 'product' not in item:
                    raise serializers.ValidationError(
                        'product missing in one of the items')

        return ret
