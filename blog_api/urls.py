from django.urls import path, re_path

from .views import (PostList, PostDetail, PostListDetailfilter, 
CreatePost, EditPost,  AdminPostDetail, DeletePost, 
UserData,GraphsData, LastUpdate, HeatFilter, ColaboradorData, ColaboradorDataObra,ColaboradorDataDetail, ColabDataEquipes, CreateColab, 
EditColab, DeleteColab, ColabDataObraServices
)

from rest_framework.routers import DefaultRouter

app_name = 'blog_api'

urlpatterns = [
    
    #Users
    path('userdata/', UserData.as_view(), name='userdata'),
      
    
    #Graphs
    path('graphsdata/<slug:slug>/', GraphsData.as_view(), name='graphsdata'),
    path('heatfilter/<slug:slug>/', HeatFilter.as_view(), name='heatfilter'),
    # path('heatdata/<int:pk>/', HeatData.as_view(), name='heatdata'),
    # path('piedata/<int:pk>/', PieData.as_view(), name='piedata'),

  
   
    #Colaboradores
    path('colabdata/', ColaboradorData.as_view(), name='colabdata'),
    path('colabdataobra/<slug:slug>/', ColaboradorDataObra.as_view(), name='colabdataobra'),
    path('colabdatadetail/<int:pk>', ColaboradorDataDetail.as_view(), name='colabdata'),
    path('colabdataequipes/<int:pk>/', ColabDataEquipes.as_view(), name='colabdequipes'),
    path('colabdataservices/<int:pk>/<slug:slug2>/', ColabDataObraServices.as_view(), name='colabservices'),
    path('criarcolab/', CreateColab.as_view(), name='criarcolab'),
    path('editcolab/<int:pk>/', EditColab.as_view(), name='editcolab'),
    path('deletecolab/<int:pk>/', DeleteColab.as_view(), name='deletecolab'),

    #Updates
    path('update/', LastUpdate.as_view(), name='update_data'),


    



    
    
    
    
    

    #Posts
    path('', PostList.as_view(), name='listpost'),
    path('post/<str:pk>/', PostDetail.as_view(), name='detailpost'),
    path('search/', PostListDetailfilter.as_view(), name='searchpost'),
    # Post Admin URLs
    path('admin/create/', CreatePost.as_view(), name='createpost'),
    path('admin/edit/postdetail/<int:pk>/', AdminPostDetail.as_view(), name='admindetailpost'),
    path('admin/edit/<int:pk>/', EditPost.as_view(), name='editpost'),
    path('admin/delete/<int:pk>/', DeletePost.as_view(), name='deletepost'),
   
]