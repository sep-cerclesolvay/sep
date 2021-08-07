from django.conf.urls import include
from django.urls.conf import path, re_path
from django.views.generic.base import RedirectView
from rest_framework import routers

from .views import ProductViewSet


class Router(routers.DefaultRouter):
    include_root_view = False


router = Router()
router.register('product', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
