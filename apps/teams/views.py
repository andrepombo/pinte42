from rest_framework import filters, generics, permissions
from blog.models import Equipe
from .serializers import EquipeSerializer
from rest_framework.response import Response



class EquipeData(generics.ListAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EquipeSerializer

    def get_queryset(self):
        """A dummy docstring."""
        item = self.kwargs.get('slug')
        equipes = Equipe.objects.filter(obra=item)
        return equipes

class UpdateEquipe(generics.UpdateAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAdminUser]
    serializer_class = EquipeSerializer
    queryset = Equipe.objects.all()
    #lookup_field = 'id'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "updated successfully"})
        else:
            return Response({"message": "failed", "details": serializer.errors})
        
class DeleteEquipe(generics.RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = EquipeSerializer
    queryset = Equipe.objects.all()

  
class EquipeDataDetail(generics.RetrieveAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EquipeSerializer
    lookup_field = 'obra'

    def get_queryset(self):
        """A dummy docstring."""
        item = self.kwargs.get('obra')
        equipe= self.kwargs.get('slug2')
        print(item)
        print(equipe)
        equipe = Equipe.objects.filter(obra=item, nome=equipe)
        return equipe