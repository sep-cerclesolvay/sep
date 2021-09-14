from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from sep_inventory.ReadWriteSerializerMixin import ReadWriteSerializerViewSet

from .serializers import ProductSerializer, PaymentMethodSerializer, ReadEntrySerializer, ReadSaleSerializer, ReadPackSerializer, WriteEntrySerializer, WriteSaleSerializer, WritePackSerializer
from .models import Entry, Pack, PaymentMethod, Product, Sale


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]


class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer
    permission_classes = [IsAuthenticated]


class PackViewSet(ReadWriteSerializerViewSet):
    queryset = Pack.objects.all()
    read_serializer_class = ReadPackSerializer
    write_serializer_class = WritePackSerializer
    permission_classes = [IsAuthenticated]


class EntryViewSet(ReadWriteSerializerViewSet):
    queryset = Entry.objects.filter(deleted_date__isnull=True)
    read_serializer_class = ReadEntrySerializer
    write_serializer_class = WriteEntrySerializer
    permission_classes = [IsAuthenticated]


class SaleViewSet(ReadWriteSerializerViewSet):
    queryset = Sale.objects.filter(
        deleted_date__isnull=True).prefetch_related('items', 'sale_to_product')
    read_serializer_class = ReadSaleSerializer
    write_serializer_class = WriteSaleSerializer
    permission_classes = [IsAuthenticated]
