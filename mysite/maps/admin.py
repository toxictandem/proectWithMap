from django.contrib import admin

# Register your models here.
from .models import Landmarks, LandDB, Routes, graph

admin.site.register(Landmarks)
admin.site.register(LandDB)
admin.site.register(Routes)
admin.site.register(graph)