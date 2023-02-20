from django.db import models
from django.forms import ModelForm

# Create your models here.
#Username: admin
#Email address: kroshhhhhhhh@gmail.com
#Password: toxic_tandem111

class Landmarks(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200,default='без имени')
    coord_x = models.DecimalField(max_digits=12,decimal_places=8,default=0.0000)
    coord_y = models.DecimalField(max_digits=12,decimal_places=8,default=0.0000)

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
    names = models.TextField()

