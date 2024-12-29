from rest_framework import filters, generics, permissions
from blog.models import Board
from .serializers import BoardSerializer, BoardUpdateSerializer
from rest_framework.response import Response


class BoardData(generics.ListAPIView):
    """A dummy docstring."""
    # permission_classes = [BoardDataPermission]
    # permission_classes = [permissions.IsAdminUser]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BoardSerializer

    def get_queryset(self):
        """A dummy docstring."""
        user = self.request.user
        qs = Board.objects.all()
        return qs if user.is_staff else qs.filter(user=user)
        # return Board.objects.filter(Q(user__is_staff=True) | Q(user=user))



class EditBoard(generics.UpdateAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAdminUser]
    serializer_class = BoardUpdateSerializer
    # serializer_class = BoardSerializer
    queryset = Board.objects.all()
    lookup_field = 'id'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "updated successfully"})
        else:
            return Response({"message": "failed", "details": serializer.errors})