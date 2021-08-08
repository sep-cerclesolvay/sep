from django.urls.conf import path

from sep_custom_auth.views import CustomAuthToken, CurrentUser


urlpatterns = [
    path('login/', CustomAuthToken.as_view()),
    path('current-user/', CurrentUser.as_view())
]
