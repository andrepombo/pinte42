from django.urls import path
from .views import GraphsData, HeatFilter


app_name = 'graphs'

urlpatterns = [
    
    #Graphs
    path('graphsdata/<slug:slug>/', GraphsData.as_view(), name='graphsdata'),
    path('heatfilter/<slug:slug>/', HeatFilter.as_view(), name='heatfilter'),
    # path('heatdata/<int:pk>/', HeatData.as_view(), name='heatdata'),
    # path('piedata/<int:pk>/', PieData.as_view(), name='piedata'),
]