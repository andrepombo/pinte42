from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView, CustomTokenObtainPairView, DeleteUser
from rest_framework_simplejwt.views import TokenRefreshView


app_name = 'users'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    path('login/', CustomTokenObtainPairView.as_view(), name="login"),
    #path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('deleteuser/<int:pk>/', DeleteUser.as_view(), name="deleteuser"),
    
    
]