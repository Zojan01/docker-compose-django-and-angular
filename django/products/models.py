from django.db import models

# Create your models here.


class Book(models.Model):
    price = models.IntegerField(); 
    pathPoster = models.CharField();

    title = models.CharField(max_length=150)
    summary = models.TextField()
    date_created = models.DateField(auto_now_add=True)


    def __str__(self):
        return self.title

class Novel(models.Model):
    price = models.models.IntegerField();   
    title
   

