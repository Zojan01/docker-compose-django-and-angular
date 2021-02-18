from django.db import models

# Create your models here.


class TypeProdcut(models.Model):
    name = models.CharField();
    fieldsType = models.TextField();
    fieldsName = models.TextField();

class Novel(models.Model):
    price   = models.IntegerField();   
    title   = models.CharField();
    author = models.CharField();
    summary = models.TextField(null=False, blank=False);
    ageLimit = models.IntegerField();
    pathPoster = models.TextField();

class House(models.Model):
   price   = models.IntegerField();
   name    = models.CharField();
   condition = models.CharField();
   sumary = models.TextField(null=False, blank=False);
   production_year = models.DateField();

   