from django.conf.urls import include
from django.urls.conf import path
from rest_framework import routers

from .views import PackViewSet
from .views import PaymentMethodViewSet
from .views import ProductViewSet
from .views import EntryViewSet
from .views import SaleViewSet
from .views import get_sale_report


class Router(routers.DefaultRouter):
    include_root_view = False


router = Router()
router.register('products', ProductViewSet)
router.register('packs', PackViewSet)
router.register('entries', EntryViewSet)
router.register('sales', SaleViewSet)
router.register('payment-methods', PaymentMethodViewSet)

urlpatterns = [
    path('reports/sales/', get_sale_report),
    path('', include(router.urls))
]
