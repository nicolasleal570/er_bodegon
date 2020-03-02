from django.db import models

# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=255)
    codigo = models.IntegerField(unique=True, null=True)
    costo = models.FloatField(null=True, default=True)
    descuento = models.IntegerField(null=True, default=True)
    category = models.ForeignKey(
        "api.Category", on_delete=models.CASCADE, null=True)
    is_available = models.BooleanField(default=True, null=True)

    def __str__(self):
        return self.name


class Stock(models.Model):
    cantidad = models.IntegerField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_vencimiento = models.DateTimeField(auto_now=False, auto_now_add=False)
    product = models.ForeignKey("api.Product", on_delete=models.CASCADE, null=True)
    is_available = models.BooleanField(null=True, default=True)

    def __str__(self):
        return "Producto del Inventario: " + self.product.name


class Category(models.Model):
    name = models.CharField(max_length=200)
    is_available = models.BooleanField(null=True, default=True)

    def __str__(self):
        return self.name


class Factura(models.Model):
    total = models.IntegerField()
    codigo = models.IntegerField(unique=True)
    pago = models.ForeignKey("api.Pago", on_delete=models.CASCADE)
    delivery = models.ForeignKey("api.Delivery", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    cliente = models.ForeignKey("api.Cliente", on_delete=models.CASCADE)
    is_available = models.BooleanField(null=True, default=True)


class FacturaDetail(models.Model):
    price_per_unit = models.FloatField()
    iva = models.FloatField()
    quantity = models.IntegerField()
    factura = models.ForeignKey("api.Factura", on_delete=models.CASCADE)
    product = models.ForeignKey("api.Product",  on_delete=models.CASCADE)
    is_available = models.BooleanField(null=True, default=True)


class Pago(models.Model):
    mount = models.FloatField()
    divisa = models.OneToOneField("api.Divisa", on_delete=models.CASCADE)
    is_available = models.BooleanField(null=True, default=True)


class Divisa(models.Model):
    tasa = models.FloatField()
    tipo = models.CharField(max_length=50)
    is_available = models.BooleanField(null=True, default=True)


class Instrumento(models.Model):
    tipo = models.CharField(max_length=50)
    codigo = models.IntegerField(unique=True)
    mount = models.FloatField()
    is_available = models.BooleanField(null=True, default=True)


class Delivery(models.Model):
    direction = models.CharField(max_length=200)
    discount = models.IntegerField()
    delivery_time = models.TimeField()
    is_available = models.BooleanField(null=True, default=True)


class Usuario(models.Model):
    name = models.CharField(max_length=200)
    phone = models.BigIntegerField()
    cedula = models.IntegerField(unique=True)
    birthday = models.DateField()
    ubication = models.CharField(max_length=200)
    is_available = models.BooleanField(null=True, default=True)


class Empleado(models.Model):
    usuario = models.OneToOneField("api.Usuario", on_delete=models.CASCADE)
    cargo = models.CharField(max_length=150)
    sueldo = models.FloatField()
    is_available = models.BooleanField(null=True, default=True)


class Cliente(models.Model):
    usuario = models.OneToOneField("api.Usuario", on_delete=models.CASCADE)
    tipo = models.CharField(max_length=150)
    empleado = models.ForeignKey("api.Empleado", on_delete=models.CASCADE, null=True)
    is_available = models.BooleanField(null=True, default=True)
