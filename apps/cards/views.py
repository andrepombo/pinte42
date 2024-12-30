from rest_framework import filters, generics, permissions
from .serializers import CardSerializer
from apps.cards.models import Card
                        


class CardData(generics.ListAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CardSerializer

    def get_queryset(self):
        """A dummy docstring."""
        # user = self.request.user
        # item = self.kwargs.get('pk')
        item = self.kwargs.get('slug')
       
        user = self.request.user
        
        return Card.objects.filter(board=item)

class DeleteCard(generics.RetrieveDestroyAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAdminUser]
    serializer_class = CardSerializer
    queryset = Card.objects.all()
    lookup_field = 'id'


class CardDataAll(generics.ListAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CardSerializer

    def get_queryset(self):
        """A dummy docstring."""
        field_name = self.kwargs.get('slug')
        # print(field_name[1])
        n = field_name[1]
        return Card.objects.filter(**{field_name: 'complete'}).order_by('-i' + n + '_date_auto')[:5]


class CardDataObra(generics.ListAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CardSerializer

    def get_queryset(self):
        """A dummy docstring."""
        field_name = self.kwargs.get('slug')
        n = field_name[1]
        # print(n)
        # item = self.kwargs.get('pk')
        item = self.kwargs.get('slug2')
        #print(item)
        data = Card.objects.filter(board=item)
        return data.filter(**{field_name: 'complete'}).order_by('-i' + n + '_date_auto')[:5]