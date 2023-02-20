
from django.urls import path

from . import views
from . import templates

urlpatterns = [
    path('mshb/', shablon, name='shb'),
    path('admin/', admin.site.urls),
    path(r'^$', index, name='index'),
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
    path('jud/', judger),
    path('error/', error),
    path('choose/', choose)
]