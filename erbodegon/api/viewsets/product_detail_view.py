from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from ..models import Product
from ..serializers.product_serializer import ProductSerializer

class ProductDetail(APIView):


    def get(self, request, pk):
        snippet = get_object_or_404(Product.objects.all(), pk=pk)
        serializer = ProductSerializer(snippet)
        return Response({
            "product": serializer.data
        })