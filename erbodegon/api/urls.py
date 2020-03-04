from django.urls import path

from .viewsets.product_view import ProductView
from .viewsets.product_detail_view import ProductDetail
from .viewsets.factura_view import FacturaView
from .viewsets.usuario_view import UsuarioView
from .viewsets.cliente_view import ClienteView
from .viewsets.pago_view import PagoView
from .viewsets.divisa_view import DivisaView
from .viewsets.factura_detail_view import FacturaDetailView
from .viewsets.stock_view import StockView
from .viewsets.instrumento_view import InstrumentoView
from .viewsets.delivery_view import DeliveryView
from .viewsets.empleado_view import EmpleadoView
from .viewsets.category_view import CategoryView

urlpatterns = [
    path('productos/', ProductView.as_view()),
    path('productos/<int:pk>', ProductView.as_view()),
    path('productos/get/<int:pk>', ProductDetail.as_view()), # Selecciona un solo producto
    path('facturas/', FacturaView.as_view()),
    path('facturas/<int:pk>', FacturaView.as_view()),
    path('facturas/detalle/', FacturaDetailView.as_view()),
    path('facturas/detalle/<int:pk>', FacturaDetailView.as_view()),
    path('usuarios/', UsuarioView.as_view()),
    path('usuarios/<int:pk>', UsuarioView.as_view()),
    path('categorias/', CategoryView.as_view()),
    path('categorias/<int:pk>', CategoryView.as_view()),
    path('clientes/', ClienteView.as_view()),
    path('clientes/<int:pk>', ClienteView.as_view()),
    path('pagos/', PagoView.as_view()),
    path('pagos/<int:pk>', PagoView.as_view()),
    path('divisas/', DivisaView.as_view()),
    path('divisas/<int:pk>', DivisaView.as_view()),
    path('inventario/', StockView.as_view()),
    path('inventario/<int:pk>', StockView.as_view()),
    path('instrumentos/', InstrumentoView.as_view()),
    path('instrumentos/<int:pk>', InstrumentoView.as_view()),
    path('delivery/', DeliveryView.as_view()),
    path('delivery/<int:pk>', DeliveryView.as_view()),
    path('empleados/', EmpleadoView.as_view()),
    path('empleados/<int:pk>', EmpleadoView.as_view()),
]
