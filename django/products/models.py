from django.db import models

# Create your models here.


class TypeProduct(models.Model):
    name = models.CharField(max_length=150);
    fieldsType = models.TextField();
    fieldsName = models.TextField();

    def __str__(self):
        return (self.name)

class Novel(models.Model):
    price   = models.IntegerField();   
    name   = models.CharField(max_length=150);
    author = models.CharField(max_length=150);
    summary = models.TextField(null=False, blank=False);
    ageLimit = models.IntegerField();
    pathPoster = models.TextField();
    typeProduct = models.ForeignKey(TypeProduct, on_delete=models.CASCADE, null=True);
    date_created = models.DateTimeField(auto_now_add=True);

    def __str__(self):
        return (self.name)


class House(models.Model):
   price   = models.IntegerField();
   name    = models.CharField(max_length=150);
   condition = models.CharField(max_length=150);
   location = models.TextField();
   sumary = models.TextField(null=False, blank=False);
   production_year = models.DateField();
   pathPoster = models.TextField();
   amountRoon = models.IntegerField();
   typeProduct = models.ForeignKey(TypeProduct, on_delete=models.CASCADE, null=True);
   date_created = models.DateTimeField(auto_now_add=True);

   def __str__(self):
        return (self.name)


   