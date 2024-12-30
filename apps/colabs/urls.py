from django.urls import path

from .views import (ColaboradorData, ColaboradorDataObra,ColaboradorDataDetail, ColabDataEquipes, CreateColab, 
EditColab, DeleteColab, ColabDataObraServices)

app_name = 'colabs'

urlpatterns = [

    path('colabdata/', ColaboradorData.as_view(), name='colabdata'),
    path('colabdataobra/<slug:slug>/', ColaboradorDataObra.as_view(), name='colabdataobra'),
    path('colabdatadetail/<int:pk>', ColaboradorDataDetail.as_view(), name='colabdata'),
    path('colabdataequipes/<int:pk>/', ColabDataEquipes.as_view(), name='colabdequipes'),
    path('colabdataservices/<int:pk>/<slug:slug2>/', ColabDataObraServices.as_view(), name='colabservices'),
    path('criarcolab/', CreateColab.as_view(), name='criarcolab'),
    path('editcolab/<int:pk>/', EditColab.as_view(), name='editcolab'),
    path('deletecolab/<int:pk>/', DeleteColab.as_view(), name='deletecolab'),

]