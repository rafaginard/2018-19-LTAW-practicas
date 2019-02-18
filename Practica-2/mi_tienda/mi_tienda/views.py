from django.http import HttpResponse
from django.template import Template, Context

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
