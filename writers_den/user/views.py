# Create your views here.
from collections import OrderedDict

from rest_framework import viewsets, mixins, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView as BaseTokenObtainPairView
from user.models import User
from user.serializers import UserSerializer


class TokenObtainPairView(BaseTokenObtainPairView):
    """
    Takes a set of user credentials and returns an access and refresh JSON web
    token pair to prove the authentication of those credentials.
    """

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        custom_response = {"jwt": response.data["access"],
                           "refresh_token": response.data["refresh"]}
        return Response(custom_response, status=status.HTTP_200_OK)


class UserViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.AllowAny()]
        else:
            return [permissions.IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        User.objects.create_user(**serializer.validated_data)
        headers = self.get_success_headers(serializer.data)
        result = TokenObtainPairSerializer().validate(attrs=OrderedDict([
            ('email', request.data['email']),
            ('password', request.data['password'])
        ]))
        return Response(result, status=status.HTTP_201_CREATED, headers=headers)

    @action(methods=['GET'], detail=True, url_path="me", url_name="me")
    def me(self, request):
        instance = User.objects.get(id=request.user.id)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
