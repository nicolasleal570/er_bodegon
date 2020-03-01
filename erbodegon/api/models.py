from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=255)
    codigo = models.IntegerField(null=True)
    costo = models.FloatField(null=True)
    descuento = models.IntegerField(null=True)
    is_available = models.BooleanField(default=True, null=True)

    def __str__(self):
        return self.name