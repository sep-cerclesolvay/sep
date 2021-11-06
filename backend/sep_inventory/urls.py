from django.conf.urls import include
from django.urls.conf import path
from rest_framework import routers

from .views import PackViewSet, PaymentMethodViewSet, ProductViewSet, EntryViewSet, SaleViewSet


class Router(routers.DefaultRouter):
    include_root_view = False


router = Router()
router.register('products', ProductViewSet)
router.register('packs', PackViewSet)
router.register('entries', EntryViewSet)
router.register('sales', SaleViewSet)
router.register('payment-methods', PaymentMethodViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
