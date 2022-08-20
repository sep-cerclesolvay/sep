from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_403_FORBIDDEN
from rest_framework.authtoken.models import Token
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

from .serializers import AuthTokenSerializer, UserSerializer


class CustomAuthToken(ObtainAuthToken):
    authentication_classes = []
    throttle_classes = [AnonRateThrottle]
    parser_classes = (JSONParser,)
    serializer_class = AuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        if user.superuser:
            return Response({'error': 'superuser'}, status=HTTP_403_FORBIDDEN)
        token, created = Token.objects.get_or_create(user=user)
        userSerialized = AuthTokenSerializer(user).data
        userSerialized['token'] = token.key
        status = HTTP_200_OK
        if created:
            status = HTTP_201_CREATED
        return Response(userSerialized, status=status)


class CurrentUser(RetrieveAPIView):
    """
    Retrieve current logged in user
    """
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data)
