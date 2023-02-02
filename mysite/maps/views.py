from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from .models import *
from . import templates

from json import dumps

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def shablon(request):
    return render(request, 'tryone.html')

def basicmap(request):
    return render(request, 'mapbasics.html')

def dbmap(request):
    dataDict = Landmarks.objects.all()
    #dataJSON = dumps(dataDict)
    return render(request, 'dbmap.html' )

def routermap(request):
    return render(request, 'router.html')

def multiroute(request):
    return render(request, 'multiroute.html')