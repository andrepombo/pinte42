from rest_framework import filters, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .serializers import  CardSerializer, ColaboradorSerializer,ColabEquipesSerializer
from blog.models import Card, Equipe, Colaborador
from django.db.models import Q


class ColaboradorData(generics.ListAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ColaboradorSerializer

    def get_queryset(self):
        """A dummy docstring."""
        user = self.request.user
        return Colaborador.objects.all()
    
class ColaboradorDataDetail(generics.RetrieveAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAdminUser]
    serializer_class = ColaboradorSerializer

    def get_queryset(self):
        """A dummy docstring."""
        return Colaborador.objects.all()
    
class ColabDataEquipes(generics.ListAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ColabEquipesSerializer
    #serializer_class = CardSerializer

    def get_queryset(self):
        """A dummy docstring."""
        item = self.kwargs.get('pk')
        qs = Equipe.objects.filter(Q(pintor1=item) | Q(pintor2=item)| Q(pintor3=item)| Q(pintor4=item))
        #print(qs)
        return qs
    
 
class ColaboradorDataObra(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ColaboradorSerializer
    
    def get_queryset(self):
        """A dummy docstring."""
        board = self.kwargs.get('slug')
        query = self.request.GET.get('q')
       
        
        if query:
            x = query.split(",")
            print('teste')
            
            qs7 = Card.objects.filter(med__in=x).filter(board=board)
            qs8 = qs7.values('equipe')
            
            colabs=[]
            qs = Equipe.objects.filter(nome__in=qs8)
            qs2 = qs.values()
            qs3 = qs2.filter(obra_id = board)
            qs4 = qs3.values_list("pintor1","pintor2","pintor3","pintor4")
            for a in qs4:
                for i in a:
                    if i != None:
                        colabs.append(i)

            qs5 = list(set(colabs))
            qs6 = Colaborador.objects.filter(id__in=qs5)
    
        else:
            colabs=[]
            qs = Equipe.objects.all()
            qs2 = qs.values()
            qs3 = qs2.filter(obra_id = board)
            qs4 = qs3.values_list("pintor1","pintor2","pintor3","pintor4")
            for a in qs4:
                for i in a:
                    if i != None:
                        colabs.append(i)

            qs5 = list(set(colabs))
            qs6 = Colaborador.objects.filter(id__in=qs5)

        return qs6
    
class ColabDataObraServices(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    
    serializer_class = CardSerializer
    
    def get_queryset(self):
        """A dummy docstring."""
        item = self.kwargs.get('pk')
        obra_id = self.kwargs.get('slug2')
        print(item)
        print(obra_id)
        print('teste')
        

        qs = Equipe.objects.filter(obra=obra_id)
        qs2 = qs.filter(Q(pintor1=item) | Q(pintor2=item)| Q(pintor3=item)| Q(pintor4=item))
        #print(qs2)
        qs3 = qs2.values('nome')
        #print(qs3)
       
        qs4 = Card.objects.filter(equipe__in=qs3).filter(board=obra_id)
        return qs4
    
    

class CreateColab(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        print(request.data)
        serializer = ColaboradorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class EditColab(generics.UpdateAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAdminUser]
    serializer_class = ColaboradorSerializer
    queryset = Colaborador.objects.all()
    

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "updated successfully"})
        else:
            return Response({"message": "failed", "details": serializer.errors})


class DeleteColab(generics.RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = ColaboradorSerializer
    queryset = Colaborador.objects.all()