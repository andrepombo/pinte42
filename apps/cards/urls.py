from django.urls import path, re_path

from .views import CardData, CardDataAll, CardDataObra, DeleteCard

app_name = 'cards'

urlpatterns = [
    path('carddata/<slug:slug>/', CardData.as_view(), name='carddata'),
    path('carddataall/<slug:slug>/', CardDataAll.as_view(), name='carddataall'),
    path('carddataobra/<slug:slug2>/<slug:slug>/', CardDataObra.as_view(), name='carddataobra'),
    path('deletecard/<id>/', DeleteCard.as_view(), name="deletecard"),
    
    ]