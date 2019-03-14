from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, 'users')

urlpatterns = [
    path('me', UserViewSet.as_view({'get': 'me'}), name="myself"),
    path('', include(router.urls)),
]
