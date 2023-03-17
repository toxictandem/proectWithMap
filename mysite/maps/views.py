from django.shortcuts import render

from django.http import HttpResponseRedirect
from .models import *

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
            ins.save()
            return render(request, 'beauty.html', {'points': pointData, 'address': a, 'duration': d, 'length': l, 'names': n})
    else:
        form = CreateRouteForm()
    return render(request, 'dinamic.html', {'data': pointData, 'form': form})

def choose(request):
    data = list(Routes.objects.all())
    pointData = list(Landmarks.objects.all())
    if request.method == 'POST':
        createForm = SaveRoute(request.POST)
        if createForm.is_valid():
            a = createForm.cleaned_data['address']
            d = createForm.cleaned_data['duration']
            l = createForm.cleaned_data['length']
            n = createForm.cleaned_data['names']
            return render(request, 'beauty.html', {'points': pointData, 'address': a, 'duration': d, 'length': l, 'names': n})
    else:
        createForm = SaveRoute()

    return render(request, 'history.html', {"data": data, 'form': createForm})

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
                return render(request, 'beauty.html/', {'points': pointData, 'address': a, 'duration': d, 'length': l, 'names': n})
            else:
                return HttpResponseRedirect('/error/')
    else:
        form = CreateStaticRouteForm()
    return render(request, 'static.html', {'data': pointData, 'form': form})

def index(request):
    return render(request, 'main.html')