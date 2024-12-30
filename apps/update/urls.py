from django.urls import path

from .views import LastUpdate

app_name = 'updates'

urlpatterns = [
    path('update/', LastUpdate.as_view(), name='update_data'),
]