from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, HttpResponseRedirect
from .models import *
from . import templates

from .forms import *

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

def length(request):
    return render(request, 'length.html')

def generate(request):
    return render(request, 'generate.html')

def send_array(request):
    dataDict = list(Routes.objects.all())
    return render(request, 'landing.html', {'data': dataDict})

def get_name(request):
    if request.method == 'POST':
        form = CreateRouteForm(request.POST)
        if form.is_valid():
            h = form.cleaned_data['hour']
            m = form.cleaned_data['minute']
            r = form.cleaned_data['points']
            return render(request, 'answer.html/', {'hour': h, 'minute': m, 'route': r})
    else:
        form = CreateRouteForm()

    return render(request, 'forms.html', {'form': form})

def pointer(request):

    pointData = list(Landmarks.objects.all())
    if request.method == 'POST':
        form = CreateRouteForm(request.POST)
        createForm = SaveRoute(request.POST)
        if form.is_valid():
            h = form.cleaned_data['hour']
            m = form.cleaned_data['minute']
            r = form.cleaned_data['points']
            tf = SaveRoute()
            return render(request, 'judger.html/', {'form': tf, 'points': pointData, 'hour': h, 'minute': m,  'route': r})
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

def animation(request):
    return render(request, 'animation.html')

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