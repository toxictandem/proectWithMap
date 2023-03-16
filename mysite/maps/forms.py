from django import forms

class CreateRouteForm(forms.Form):
    hour = forms.IntegerField(label='Часы',max_value=8,min_value=0,initial=0,widget=forms.HiddenInput())
    minute = forms.IntegerField(label='Минуты',max_value=59,min_value=0,initial=0,error_messages={'required': 'Задано неподходящее значение'})
    points = forms.CharField(label='Точки',max_length=1400,required=False,initial=0,widget=forms.HiddenInput())
    depth = forms.IntegerField(label='Глубина генерации маршрута',max_value=10,min_value=1,initial=1)

class SaveRoute(forms.Form):
    address = forms.CharField(label='Точки',max_length=1400,required=False,initial=0,widget=forms.HiddenInput())
    duration = forms.IntegerField(label='Время',max_value=28800,min_value=0,initial=0,widget=forms.HiddenInput())
    length = forms.IntegerField(widget=forms.HiddenInput())
    names = forms.CharField(label='Точки',max_length=10000,required=False,initial=0,widget=forms.HiddenInput())

class CreateStaticRouteForm(forms.Form):
    address = forms.CharField(label='Точки',max_length=1400,required=False,initial=0,widget=forms.HiddenInput())