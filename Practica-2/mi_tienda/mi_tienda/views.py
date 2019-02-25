from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render

def Init(request):

    return render(request, 'index.html', {'user' : 'Rafa'})

def Botas(request):
    return render(request, 'botas.html', {})

def Esquis(request):
    return render(request, 'esquis.html', {})


PLANTILLA = """
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>Saludo</title>
      </head>
      <body>
        <p>Bienvenido a mi tienda, {{user}}</p>

      </body>
    </html>
"""
