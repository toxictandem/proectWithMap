
from django.urls import path

from . import views
from . import templates

urlpatterns = [
    path('', views.index, name='index'),
    path('', views.shablon, name='shb'),
    path('', views.basicmap, name='basic'),
    path('', views.dbmap, name='dbm'),
    path('', views.routermap, name='rtr'),
    path('', views.multiroute, name='mlt').
    path('', views.length, name='len')
]