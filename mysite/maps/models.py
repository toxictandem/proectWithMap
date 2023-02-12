from django.db import models

# Create your models here.
#Usrname: admin
#Email adress: kroshhhhhhhh@gmail.com
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