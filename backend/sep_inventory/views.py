from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated

from .serializers import PackSerializer, PaymentMethodSerializer, ProductSerializer, ReadOnlyEntrySerializer, ReadOnlyPackSerializer, ReadOnlySaleSerializer
from .models import Entry, Pack, PaymentMethod, Product, Sale


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]


class ReadOnlyPackViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Pack.objects.all()
    serializer_class = ReadOnlyPackSerializer
    permission_classes = [IsAuthenticated]


class PackViewSet(mixins.CreateModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):
    queryset = Pack.objects.all()
    serializer_class = PackSerializer
    permission_classes = [IsAuthenticated]


class ReadOnlyEntryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Entry.objects.filter(deleted_date__isnull=True)
    serializer_class = ReadOnlyEntrySerializer
    permission_classes = [IsAuthenticated]


class ReadOnlySaleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Sale.objects.filter(
        deleted_date__isnull=True).prefetch_related('items', 'sale_to_product')
    serializer_class = ReadOnlySaleSerializer
    permission_classes = [IsAuthenticated]


class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer
    permission_classes = [IsAuthenticated]
