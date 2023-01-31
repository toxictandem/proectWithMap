
from django.urls import path

from . import views
from . import templates

urlpatterns = [
    path('', views.index, name='index'),
    path('map/', views.shablon, name='shb')
]