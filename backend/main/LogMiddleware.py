from django.utils.http import url_has_allowed_host_and_scheme
from django.conf import settings

# Can be use for debugging purpose


class LogMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        self.log(request, response)
        return response

    def log(self, request, response):
        next_url = request.META.get("HTTP_REFERER")
        check = url_has_allowed_host_and_scheme(
            url=next_url,
            allowed_hosts={request.get_host()},
            require_https=request.is_secure(),
        )
        print(
            f'{request.method} {next_url} ALLOWED_HOSTS={settings.ALLOWED_HOSTS}, allowed_hosts={request.get_host()}, require_https={request.is_secure()}, check={check}')
