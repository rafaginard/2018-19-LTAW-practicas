from django.db import models

class Esquis(models.Model):
    ID = models.IntegerField()
    Marca = models.CharField(max_length=50)
    Longitud = models.IntegerField()
    Color = models.CharField(max_length=30)
    Estilo = models.CharField(max_length=50)
    Aviable = models.BooleanField()

class Botas(models.Model):
    ID = models.IntegerField()
    Marca = models.CharField(max_length=50)
    Longitud = models.IntegerField()
    Color = models.CharField(max_length=30)
    Estilo = models.CharField(max_length=50)
    Aviable = models.BoolField()

class Person(models.Model):
    ID = models.IntegerField()
    User_Name = models.CharField(max_length=50)
    Passwd = models.CharField(max_length=60)
    Age = models.IntegerField()
