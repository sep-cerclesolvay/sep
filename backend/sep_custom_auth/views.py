from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from sep_custom_auth.models import User

from .serializers import UserSerializer


class CustomAuthToken(ObtainAuthToken):
    authentication_classes = []
    throttle_classes = [AnonRateThrottle]
    parser_classes = (JSONParser,)


class CurrentUser(APIView):
    """
    Retrieve current logged in user
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        try:
            serializer = UserSerializer(request.user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
