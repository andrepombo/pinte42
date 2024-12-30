from django.urls import path, re_path

from .views import (
UserData,LastUpdate, 
)

from rest_framework.routers import DefaultRouter

app_name = 'blog_api'

urlpatterns = [
    
    #Users
    path('userdata/', UserData.as_view(), name='userdata'),
      
    

   
    

    #Updates
    path('update/', LastUpdate.as_view(), name='update_data'),


    



    
    
    
    
    

 
   
]