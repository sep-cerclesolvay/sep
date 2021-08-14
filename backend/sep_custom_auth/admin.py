from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

User = get_user_model()

admin.site.unregister(Group)


class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ['name', 'admin', 'superuser']
    list_filter = ['admin']
    fieldsets = (
        (None, {'fields': ('name', 'password')}),
        ('Permissions', {'fields': ('admin',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('name', 'password1', 'password2')}
         ),
    )
    search_fields = ['name']
    ordering = ['name']
    filter_horizontal = ()

    def has_delete_permission(self, request, obj=None):
        if obj is None:
            return True
        else:
            return request.user != obj


admin.site.register(User, UserAdmin)
