from django.db import models

# Create your models here.
class Student(models.Model):
    firstName       = models.CharField(max_length=30)
    lastName        = models.CharField(max_length=50)
    email           = models.EmailField(max_length=100)
    password        = models.CharField(max_length=50)
    cwid            = models.IntegerField()
    classification  = models.CharField(max_length=20)

