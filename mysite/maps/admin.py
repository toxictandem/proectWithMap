from django.contrib import admin

# Register your models here.
from .models import Landmarks, LandDB

admin.site.register(Landmarks)
admin.site.register(LandDB)