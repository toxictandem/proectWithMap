"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from maps.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('p/', pointer, name='point'),
    path('answer/', answer),
    path('jud/', judger),
    path('error/', error),
    path('choose/', choose, name='choose'),
    path('create/', create, name='create'),
    path('temp/', temp, name='temp'),
    path('', index, name='index'),
    path('din/', dinamic, name='dinamic'),
    path('stat/', static, name='static')
]