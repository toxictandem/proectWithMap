from django import forms

class CreateRouteForm(forms.Form):
    hour = forms.IntegerField(label='Часы',max_value=8,min_value=0,initial=0)
    minute = forms.IntegerField(label='Минуты',max_value=59,min_value=0,initial=0)
    points = forms.CharField(label='Точки',max_length=1400,required=False,initial=0)
