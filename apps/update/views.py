from .serializers import UpdateSerializer
from rest_framework import generics, permissions
from apps.update.models import UpdateData


class LastUpdate(generics.ListAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UpdateSerializer

    def get_queryset(self):
        """A dummy docstring."""
        qs = UpdateData.objects.all()
        return qs.order_by('-last_update')[:1]
    

    