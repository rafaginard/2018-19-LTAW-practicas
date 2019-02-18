"""mi_tienda URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from mi_tienda.views import Mi_Funcion
from mi_tienda.views import Mi_Producto
from mi_tienda.views import saludo

urlpatterns = [
    url(r'^test/', include(admin.site.urls)),
    url(r'^hola/', Mi_Funcion),
    url(r'^producto/(\d{1,2})/', Mi_Producto),
    url(r'^saludo/', saludo),
]
