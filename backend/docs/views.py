from django.contrib.auth.views import redirect_to_login
from django.urls import reverse
from django.shortcuts import redirect, render
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.schemas import get_schema_view as super_get_schema_view

from docs.openapi import OASSchemaGenerator
from sep_custom_auth.auth import IsSuperUser


def docs(request):
    if not bool(request.user and request.user.is_authenticated):
        return redirect_to_login(
            request.get_full_path(),
            reverse('admin:login')
        )
    context = {'username': request.user.name,
               'is_authorized': bool(request.user and request.user.is_admin),
               'docs_url': 'index',
               'swagger_ui_url': 'swagger-ui',
               'admin_url': 'admin:index'}
    return render(request, "docs.html", context)


def get_schema_view():
    return super_get_schema_view(
        title="BALEF API",
        generator_class=OASSchemaGenerator,
        authentication_classes=[SessionAuthentication],
        permission_classes=[IsAuthenticated, IsSuperUser],
        renderer_classes=[JSONRenderer]
    )


def swagger_ui(request):
    context = {'schema_url': 'openapi-spec', }
    resp = render(request, "swagger-ui.html", context)
    resp['X-Frame-Options'] = 'SAMEORIGIN'
    return resp
