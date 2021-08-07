from django.urls import path
from docs.views import docs, get_schema_view, swagger_ui


urlpatterns = [
    path('spec.json', get_schema_view(), name='openapi-spec'),
    path('swagger-ui/', swagger_ui, name='swagger-ui'),
    path('', docs, name='index'),
]
