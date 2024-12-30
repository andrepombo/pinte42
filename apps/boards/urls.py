from django.urls import path, re_path

from .views import BoardData, UpdateBoard

app_name = 'boards'

urlpatterns = [
    path('boarddata/', BoardData.as_view(), name='boardddata'),
    path('editboard/<id>/', UpdateBoard.as_view(), name='editboard'),
    ]