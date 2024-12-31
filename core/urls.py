from django.contrib import admin
from django.urls import path, include, re_path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework import permissions
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

schema_view = get_schema_view(
    openapi.Info(
        title="Projeto Pinte Pinturas v2",
        default_version='v1',
        description="Este documento descreve os recursos disponíveis nesta API",
        terms_of_service="https://www.google.com/policies/terms/",
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)
urlpatterns = [
    # Project URLs
    path('admin/', admin.site.urls),
    path(r'api/', include('apps.boards.urls', namespace='boards')),
    path(r'api/', include('apps.teams.urls', namespace='teams')),
    path(r'api/', include('apps.cards.urls', namespace='cards')),
    path(r'api/', include('apps.graphs.urls', namespace='graphs')),
    path(r'api/', include('apps.colabs.urls', namespace='colabs')),
    path(r'api/', include('apps.users.urls', namespace='users')),
    path(r'api/', include('apps.update.urls', namespace='updates')),

    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   
    re_path(r'^(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header  =  "Pinte Admin Page"  
# admin.site.site_title  =  "Pinte"
admin.site.index_title  =  "Pinte Admin"

