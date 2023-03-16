from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, HttpResponseRedirect
from .models import *
from . import templates

from .forms import *

def pointer(request):
    pointData = list(Landmarks.objects.all())
    edges = list(graph.objects.all())
    if request.method == 'POST':
        form = CreateRouteForm(request.POST)
        createForm = SaveRoute(request.POST)
        if form.is_valid():
            h = form.cleaned_data['hour']
            m = form.cleaned_data['minute']
            r = form.cleaned_data['points']
            dp = form.cleaned_data['depth']
            tf = SaveRoute()
            return render(request, 'judger.html/', {'form': tf, 'points': pointData, 'hour': h, 'minute': m, 'depth': dp, 'route': r, 'edges': edges})
        elif createForm.is_valid():
            a = createForm.cleaned_data['address']
            d = createForm.cleaned_data['duration']
            l = createForm.cleaned_data['length']
            n = createForm.cleaned_data['names']
            ins = Routes(address=a, duration=d, length=l, names=n)
            if d > -1 and l > -1:
                ins.save()
                return render(request, 'answer.html/', {'points': pointData, 'address': a, 'duration': d, 'length': l, 'names': n})
            else:
                return HttpResponseRedirect('/error/')
    else:
        form = CreateRouteForm()


    return render(request, 'point.html', {'data': pointData, 'form': form})

def answer(request):
    return render(request, 'answer.html')

def judger(request):
    points = list(Landmarks.objects.all())
    return render(request, 'judger.html', {"points": points})

def error(request):
    return render(request, 'error.html')

def choose(request):
    data = list(Routes.objects.all())
    pointData = list(Landmarks.objects.all())
    edges = list(graph.objects.all())
    if request.method == 'POST':
        createForm = SaveRoute(request.POST)
        if createForm.is_valid():
            a = createForm.cleaned_data['address']
            d = createForm.cleaned_data['duration']
            l = createForm.cleaned_data['length']
            n = createForm.cleaned_data['names']
            return render(request, 'answer.html/', {'points': pointData, 'address': a, 'duration': d, 'length': l, 'names': n})
    else:
        createForm = SaveRoute()

    return render(request, 'choose.html', {"data": data, 'form': createForm})

def create(request):
    pointData = list(Landmarks.objects.all())
    if request.method == 'POST':
        createForm = CreateStaticRouteForm(request.POST)
        form = SaveRoute(request.POST)
        if createForm.is_valid():
            a = createForm.cleaned_data['address']
            tf = SaveRoute()
            return render(request, 'validator.html/', {'points': pointData, 'form':tf, 'route': a})
        elif form.is_valid():
            a = createForm.cleaned_data['address']
            d = createForm.cleaned_data['duration']
            l = createForm.cleaned_data['length']
            n = createForm.cleaned_data['names']
            ins = Routes(address=a, duration=d, length=l, names=n)
            if d > -1 and l > -1:
                ins.save()
                return render(request, 'answer.html/', {'points': pointData, 'address': a, 'duration': d, 'length': l, 'names': n})
            else:
                return HttpResponseRedirect('/error/')
    else:
        form = CreateStaticRouteForm()
    return render(request, 'draw.html', {'data': pointData, 'form': form})

def temp(request):
    pointData = list(Landmarks.objects.all())
    scheme = [1, 2, 3, 4, 5]
    return render(request, 'temp.html', {'points': pointData, 'row': scheme})

def index(request):
    return render(request, 'main.html')

def dinamic(request):
    form = CreateRouteForm()
    pointData = list(Landmarks.objects.all())
    return render(request, 'dinamic.html', {'form': form, 'data': pointData})

def static(request):
    form = CreateRouteForm()
    pointData = list(Landmarks.objects.all())
    return render(request, 'static.html', {'form': form, 'data': pointData})