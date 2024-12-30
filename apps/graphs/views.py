from rest_framework import filters, generics, permissions
from rest_framework.response import Response
from django_pandas.io import read_frame
from blog.models import Card
from . import graphs_process


class GraphsData(generics.RetrieveAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAuthenticated]

    def get(self,request, slug):
        query = self.request.GET.get('q')
        item = self.kwargs.get('slug')
       
        x = query.split(",")
        
        
        if query:
            qs3=  Card.objects.filter((Q(macro__in=x)) & Q(board=item))
            if query == "TODOS":
                qs3 = Card.objects.filter(board=item)
        else:
            qs = Card.objects.filter(board=item)
            qs2 = qs.order_by('local')
            print(qs2.count())
            qs3 = qs2[0:142]
        df = read_frame(qs3)

        data = graphs_process.process_dataframe(df)
        return Response(data)

class HeatFilter(generics.RetrieveAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAuthenticated]

    def get(self,request, slug):
        # item = self.kwargs.get('pk')
        item = self.kwargs.get('slug')
        
        qs = Card.objects.filter(board=item)
       
        df = read_frame(qs)

        data = graphs_process.process_dataframe2(df)
        return Response(data)