# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template

def Init(request):

    return render(request, 'index.html', {'user' : 'Rafa'})

def Botas(request):
    return render(request, 'botas.html', {})

def Esquis(request):
    return render(request, 'esquis.html', {})
# Create your views here.
