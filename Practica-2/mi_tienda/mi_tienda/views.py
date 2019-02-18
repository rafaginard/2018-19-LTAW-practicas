from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template


def Init(request):
    t = Template('/home/alumnos/rginard/Escritorio/LTW_Practicas/2018-19-LTAW-practicas/Practica-2/mi_tienda/mi_tienda/templates/index.html')
    
    return HttpResponse(t)

def Mi_Funcion(request):
    html = "HOLA, probando"

    return HttpResponse(html)

def Mi_Producto(request, param):
    numero = int(param)

    html = "Acceso al producto: %i" %numero
    return HttpResponse(html)

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

def saludo(request):
    t = Template(PLANTILLA)
    c = Context({'user': 'Rafa'})

    html = t.render(c)

    return HttpResponse(html)
