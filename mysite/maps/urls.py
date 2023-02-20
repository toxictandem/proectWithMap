
from django.urls import path

from . import views
from . import templates

urlpatterns = [
    path('admin/', admin.site.urls),
    path('p/', pointer, name='point'),
    path('answer/', answer),
    path('jud/', judger),
    path('error/', error),
    path('choose/', choose)
]