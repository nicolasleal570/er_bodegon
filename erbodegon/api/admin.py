from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Product)
admin.site.register(Stock)
admin.site.register(Category)
admin.site.register(Factura)
admin.site.register(FacturaDetail)
admin.site.register(Pago)
admin.site.register(Divisa)
admin.site.register(Delivery)
admin.site.register(Instrumento)
admin.site.register(Usuario)
admin.site.register(Empleado)
admin.site.register(Cliente)