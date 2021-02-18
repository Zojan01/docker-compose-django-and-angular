from django.db import models

# Create your models here.


class TypeProdcut(models.Model):
    name = models.CharField(max_length=150);
    fieldsType = models.TextField();
    fieldsName = models.TextField();

class Novel(models.Model):
    price   = models.IntegerField();   
    name   = models.CharField(max_length=150);
    author = models.CharField(max_length=150);
    summary = models.TextField(null=False, blank=False);
    ageLimit = models.IntegerField();
    pathPoster = models.TextField();
    TypeProdcut = models.ForeignKey(TypeProdcut, on_delete=models.CASCADE, null=True);
    date_created = models.DateTimeField(auto_now_add=True)


class House(models.Model):
   price   = models.IntegerField();
   name    = models.CharField(max_length=150);
   condition = models.CharField(max_length=150);
   location = models.TextField();
   sumary = models.TextField(null=False, blank=False);
   production_year = models.DateField();
   pathPoster = models.TextField();
   amountRoon = models.IntegerField();
   typeProdcut = models.ForeignKey(TypeProdcut, on_delete=models.CASCADE, null=True);
   date_created = models.DateTimeField(auto_now_add=True)


   