from rest_framework import filters, generics, permissions
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from blog.models import Post, Card, Board, UpdateData, Equipe, Colaborador
from users.models import NewUser
from users.serializers import CustomUserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import (SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly,
                                        BasePermission, IsAdminUser, DjangoModelPermissions, AllowAny)
from rest_framework.response import Response
from rest_framework import status

from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin

# Important to convert queryset to pandas df
from django_pandas.io import read_frame
from django.shortcuts import get_object_or_404
from .serializers import (PostSerializer, CardSerializer,  UpdateSerializer, 
                         EquipeSerializer, ColaboradorSerializer,
                          ColabEquipesSerializer)
from .permissions import BoardDataPermission
from . import services
from . import graphs_process
from django.db.models import Q



class LastUpdate(generics.ListAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UpdateSerializer

    def get_queryset(self):
        """A dummy docstring."""
        qs = UpdateData.objects.all()
        return qs.order_by('-last_update')[:1]


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


class UserData(generics.ListAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAdminUser]
    serializer_class = CustomUserSerializer

    def get_queryset(self):
        """A dummy docstring."""
        user = self.request.user
        # return NewUser.objects.filter(Q(is_staff = True) | Q(email = 'david@andre.com')   )
        return NewUser.objects.all()
    
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
    

        #qs5 = qs.values("obra_id","nome")
        #print(qs5)
        
        # qs6 =[]
        # for i in qs5:
        #     print(i['obra_id'],i['nome'])
        #     qs6.extend(Card.objects.filter(board=i['obra_id'], equipe=i['nome']))
        # return qs6
    

    
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
















#########################################################################################################

class PostList(generics.ListAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        """A dummy docstring."""
        user = self.request.user
        return Post.objects.filter(author=user)


class PostDetail(generics.RetrieveAPIView):
    """A dummy docstring."""
    serializer_class = PostSerializer

    def get_object(self, queryset=None, **kwargs):
        """A dummy docstring."""
        item = self.kwargs.get('pk')
        return get_object_or_404(Post, id=item)


class PostListDetailfilter(generics.ListAPIView):
    """A dummy docstring."""
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^nome']

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(author=user)

# Post Admin

class CreatePost(APIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        """A dummy docstring."""
        print(request.data)
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminPostDetail(generics.RetrieveAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class DeletePost(generics.RetrieveDestroyAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()



class EditPost(generics.UpdateAPIView):
    """A dummy docstring."""
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()


# class PieData(generics.ListAPIView):
#     """A dummy docstring."""
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = CardSerializer

#     def get(self,request,pk):
#             item = self.kwargs.get('pk')
#             qs = Card.objects.filter(board=item)
#             df = read_frame(qs)
#             data = graphs_process.pie_data_process(df)

#             return Response(data)

# class HeatData(generics.RetrieveAPIView):
#     """A dummy docstring."""
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self,request,pk):
#         item = self.kwargs.get('pk')
#         qs = Card.objects.filter(board=item)
#         df = read_frame(qs)

#         data = graphs_process.heat_data_process(df)
#         return Response(data)


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
