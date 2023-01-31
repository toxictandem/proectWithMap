from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from . import templates

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def shablon(request):
    return render(request, 'tryone.html')

def basicmap(request):
    return render(request, 'mapbasics.html')