from django.conf.urls import include
from django.urls.conf import path
from rest_framework import routers

from .views import EventViewSet
from .views import EventTicketViewSet


class Router(routers.DefaultRouter):
    include_root_view = False
    include_format_suffixes = False


router = Router()
router.register('events', EventViewSet)
router.register('events', EventTicketViewSet)

app_name = 'events'
urlpatterns = [
    path('', include(router.urls)),
]
