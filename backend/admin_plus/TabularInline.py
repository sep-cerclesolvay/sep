from django.contrib import admin


class TabularInline(admin.TabularInline):
    class Media:
        css = {"all": ("admin_plus/css/tabular_inline_hide_original.css",)}

    def get_extra(self, request, obj=None, **kwargs):
        if obj and self.get_inline_count(obj) > 0:
            return 0
        return 1

    def get_inline_count(self, obj):
        raise NotImplementedError

    def formfield_for_dbfield(self, db_field, request, **kwargs):
        formfield = super().formfield_for_dbfield(
            db_field, request, **kwargs)
        if formfield != None and db_field.is_relation:
            # formfield.widget.can_add_related = False
            # formfield.widget.can_change_related = False
            formfield.widget.can_delete_related = False
        return formfield
