from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated

from .serializers import PackSerializer, PaymentMethodSerializer, ProductSerializer, ReadOnlyPackSerializer
from .models import Pack, PaymentMethod, Product


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


class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer
    permission_classes = [IsAuthenticated]
