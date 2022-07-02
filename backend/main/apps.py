from django.contrib.admin import apps


class MainAdminConfig(apps.AdminConfig):
    default_site = 'admin_plus.admin.AdminPlusSite'
