from django.urls import path

from .viewsets.product_view import ProductView
from .viewsets.product_detail_view import ProductDetail

app_name="products"

urlpatterns = [
    path('products/', ProductView.as_view()),
    path('products/<int:pk>', ProductView.as_view()),
    path('products/get/<int:pk>', ProductDetail.as_view())
]
