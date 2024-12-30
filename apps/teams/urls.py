from django.urls import path, re_path

from .views import EquipeData, EquipeDataDetail, UpdateEquipe, DeleteEquipe

app_name = 'teams'

urlpatterns = [
    
    #Equipes
    path('equipesdata/<slug:slug>/', EquipeData.as_view(), name='equipesdata'),
    path('equipedatadetail/<obra>/<slug:slug2>/', EquipeDataDetail.as_view(), name='equipedatadetail'),
    path('editequipe/<int:pk>/', UpdateEquipe.as_view(), name='editequipe'),
    path('deleteequipe/<int:pk>/', DeleteEquipe.as_view(), name='deleteequipe'),
]