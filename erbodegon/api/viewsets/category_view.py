from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from ..models import Category
from ..serializers.category_serializer import CategorySerializer

#-- PRODUCT VIEW --#
class CategoryView(APIView):
    # HTTP GET
    def get(self, request):
        # categories = Category.objects.raw('SELECT COUNT(CustomerID), Country FROM Customers GROUP BY Country')
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response({"categories": serializer.data})

    # HTTP POST
    def post(self, request):
        category = request.data.get('category')

        serializer = CategorySerializer(data=category)
        if serializer.is_valid(raise_exception=True):
            category_saved = serializer.save()
        return Response({
            "success": "Category '{}' created successfully".format(category_saved.name),
            "category": serializer.data
        })

    # HTTP PUT
    def put(self, request, pk):
        saved_category = get_object_or_404(Category.objects.all(), pk=pk)
        data = request.data.get('category')
        serializer = CategorySerializer(instance=saved_category, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            category_saved = serializer.save()
        return Response({
            "success": "Category '{}' updated successfully".format(category_saved.name),
            "category": serializer.data
        })

    # HTTP DELETE
    def delete(self, request, pk):
        # Get object with this pk
        category = get_object_or_404(Category.objects.all(), pk=pk)
        category.delete()
        return Response({"sucess": "Category with id `{}` has been deleted.".format(pk)})

