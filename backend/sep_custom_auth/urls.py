from django.urls.conf import path

from sep_custom_auth.views import CustomAuthToken


urlpatterns = [
    path('login', CustomAuthToken.as_view())
]
