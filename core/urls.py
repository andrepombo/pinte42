from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Project URLs
    path('admin/', admin.site.urls),
    path('', include('blog.urls', namespace='blog')),

  
    path('api/', include('blog_api.urls', namespace='blog_api')),

    path(r'api/', include('apps.boards.urls', namespace='boards')),
    path(r'api/', include('apps.teams.urls', namespace='teams')),
    path(r'api/', include('apps.cards.urls', namespace='cards')),
    path(r'api/', include('apps.graphs.urls', namespace='graphs')),
    path(r'api/', include('apps.colabs.urls', namespace='colabs')),
    path(r'api/', include('apps.users.urls', namespace='users')),

    
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   
    # API schema and Documentation
    path('project/docs/', include_docs_urls(title='BlogAPI')),
    
    path('project/schema', get_schema_view(
        title="BlogAPI",
        description="API for the BlogAPI",
        version="1.0.0"
    ), name='openapi-schema'),
]

admin.site.site_header  =  "Pinte admin"  
admin.site.site_title  =  "Pinte admin site"
admin.site.index_title  =  "Pinte Admin"

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)