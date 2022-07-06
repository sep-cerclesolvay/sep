from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

class SepInventoryConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'sep_inventory'
    verbose_name = _('Inventory')
