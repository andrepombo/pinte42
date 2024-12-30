from rest_framework import filters, generics, permissions
from blog.models import UpdateData
from apps.users.models import NewUser
from apps.users.serializers import CustomUserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import (SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly,
                                        BasePermission, IsAdminUser, DjangoModelPermissions, AllowAny)
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin

from .serializers import UpdateSerializer
                         
                          





class LastUpdate(generics.ListAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UpdateSerializer

    def get_queryset(self):
        """A dummy docstring."""
        qs = UpdateData.objects.all()
        return qs.order_by('-last_update')[:1]
    

    

class UserData(generics.ListAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAdminUser]
    serializer_class = CustomUserSerializer

    def get_queryset(self):
        """A dummy docstring."""
        user = self.request.user
        # return NewUser.objects.filter(Q(is_staff = True) | Q(email = 'david@andre.com')   )
        return NewUser.objects.all()
    

""" 

'^' Starts-with search.
'=' Exact matches.
'@' Full-text search. (Currently only supported Django's PostgreSQL backend.)
'$' Regex search.   

Concrete View Classes
# CreateAPIView
Used for create-only endpoints.
# ListAPIView
Used for read-only endpoints to represent a collection of model instances.
# RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
# DestroyAPIView
Used for delete-only endpoints for a single model instance.
# UpdateAPIView
Used for update-only endpoints for a single model instance.
# ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
# RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
# RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""
