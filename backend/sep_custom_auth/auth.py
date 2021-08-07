from rest_framework.authentication import TokenAuthentication as BaseTokenAuthentication
from rest_framework.permissions import BasePermission


class TokenAuthentication(BaseTokenAuthentication):
    keyword = 'Bearer'


class IsSuperUser(BasePermission):
    """
    Allows access only to admin users.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_admin)
