from django.db import models
from django.forms import ModelForm

# Create your models here.
#Username: admin
#Email address: kroshhhhhhhh@gmail.com
#Password: toxic_tandem111

class Landmarks(models.Model):
    name = models.CharField(max_length=200)
    coord_x = models.IntegerField(default=0)
    coord_y = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class LandDB(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Routes(models.Model):
    address = models.TextField()
    duration = models.IntegerField(default=0)
    length = models.IntegerField(default=0)
    #def __str__(self):
    #    return self.name
