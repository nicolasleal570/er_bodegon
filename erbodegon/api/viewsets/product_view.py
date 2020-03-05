from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from ..models import Product
from ..serializers.product_serializer import ProductSerializer

#-- PRODUCT VIEW --#
class ProductView(APIView):
    # HTTP GET
    def get(self, request):
        # products = Product.objects.raw('SELECT COUNT(category_id), name, id FROM api_product GROUP BY name')
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response({"products": serializer.data})

    # HTTP POST
    def post(self, request):
        product = request.data.get('product')

        serializer = ProductSerializer(data=product)
        if serializer.is_valid(raise_exception=True):
            product_saved = serializer.save()
        return Response({
            "success": "Product '{}' created successfully".format(product_saved.name),
            "product": serializer.data
        })

    # HTTP PUT
    def put(self, request, pk):
        saved_product = get_object_or_404(Product.objects.all(), pk=pk)
        data = request.data.get('product')
        serializer = ProductSerializer(instance=saved_product, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            product_saved = serializer.save()
        return Response({
            "success": "Product '{}' updated successfully".format(product_saved.name),
            "product": serializer.data
        })

    # HTTP DELETE
    def delete(self, request, pk):
        # Get object with this pk
        product = get_object_or_404(Product.objects.all(), pk=pk)
        product.delete()
        return Response({"sucess": "Product with id `{}` has been deleted.".format(pk)})

