from typing import List
from django.contrib.admin import AdminSite
from django.template.response import TemplateResponse
from django.urls import URLResolver
from admin_plus.utils import get_database_usage


class AdminPlusSite(AdminSite):
    database_usage_title = 'Database Usage'
    database_usage_template = None

    def get_urls(self) -> List[URLResolver]:
        temp_final_catch_all_view = self.final_catch_all_view
        self.final_catch_all_view = False
        urlpatterns = super(AdminPlusSite, self).get_urls()
        self.final_catch_all_view = temp_final_catch_all_view

        from django.urls import path, re_path

        urlpatterns += [
            path("database/", self.database_usage, name="database-usage"),
        ]

        if self.final_catch_all_view:
            urlpatterns += [
                re_path(r"(?P<url>.*)$", self.catch_all_view)
            ]

        return urlpatterns

    def index(self, request, extra_context=None) -> TemplateResponse:

        context = {
            'database_usage_graph': get_database_usage(type='usage', limit=12, max_usage=10000),
            **(extra_context or {}),
        }

        return super(AdminPlusSite, self).index(request, extra_context=context)

    def database_usage(self, request, extra_context=None) -> TemplateResponse:

        context = {
            **self.each_context(request),
            'title': self.database_usage_title,
            'subtitle': None,
            'database_usage_graph': get_database_usage(type='usage', limit=12, max_usage=10000),
            'database_usage_all': get_database_usage(),
            **(extra_context or {}),
        }

        request.current_app = self.name

        return TemplateResponse(
            request, self.database_usage_template or "admin_plus/database_usage.html", context
        )


site = AdminPlusSite()
