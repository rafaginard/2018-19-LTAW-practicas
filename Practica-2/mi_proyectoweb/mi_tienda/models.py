# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Product(models.Model):
    ID = models.IntegerField()
    Tipo = models.CharField(max_length=50)
    Marca = models.CharField(max_length=50)
    Longitud = models.IntegerField()
    Color = models.CharField(max_length=30)
    Estilo = models.CharField(max_length=50)
    Aviable = models.BooleanField()

class Person(models.Model):
    Clave = models.IntegerField()
    User_Name = models.CharField(max_length=50)
    Passwd = models.CharField(max_length=60)
    Age = models.IntegerField()
