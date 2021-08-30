from django.conf.urls import include
from django.urls.conf import path
from rest_framework import routers

from .views import PackViewSet, PaymentMethodViewSet, ProductViewSet, ReadOnlyEntryViewSet, ReadOnlyPackViewSet, ReadOnlySaleViewSet


class Router(routers.DefaultRouter):
    include_root_view = False


router = Router()
router.register('products', ProductViewSet)
router.register('packs', ReadOnlyPackViewSet)
router.register('packs', PackViewSet)
router.register('entries', ReadOnlyEntryViewSet)
router.register('sales', ReadOnlySaleViewSet)
router.register('payement-methods', PaymentMethodViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
