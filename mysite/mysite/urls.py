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
    path('mshb/', shablon, name='shb'),
    path('admin/', admin.site.urls),
    path('index/', index, name='index'),
    path('map/', basicmap, name='basic'),
    path('dbm/', dbmap, name='dbm'),
    path('rtr/', routermap, name='rtr'),
    path('multi/', multiroute, name='mlt'),
    path('len/', length, name='len'),
    path('gen/', generate, name='gen'),
    path('arr/', send_array, name='arr'),
    path('form/', get_name, name='form'),
    path('p/', pointer, name='point'),
    path('anim/', animation, name='anim'),
    path('answer/', answer),
    path('jud/', judger)
]