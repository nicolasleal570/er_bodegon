from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from ..models import Stock
from ..serializers.stock_serializer import StockSerializer

#-- PRODUCT VIEW --#
class StockView(APIView):
    # HTTP GET
    def get(self, request):
        # stocks = Stock.objects.raw('SELECT * FROM stock_stock WHERE id = "Articulo 3 de la api"')
        stocks = Stock.objects.all()
        serializer = StockSerializer(stocks, many=True)
        return Response({"stocks": serializer.data})

    # HTTP POST
    def post(self, request):
        stock = request.data.get('stock')

        serializer = StockSerializer(data=stock)
        if serializer.is_valid(raise_exception=True):
            stock_saved = serializer.save()
        return Response({
            "success": "Stock '{}' created successfully".format(stock_saved.id),
            "stock": stock
        })

    # HTTP PUT
    def put(self, request, pk):
        saved_stock = get_object_or_404(Stock.objects.all(), pk=pk)
        data = request.data.get('stock')
        serializer = StockSerializer(instance=saved_stock, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            stock_saved = serializer.save()
        return Response({
            "success": "Stock '{}' updated successfully".format(stock_saved.id),
            "stock": data
        })

    # HTTP DELETE
    def delete(self, request, pk):
        # Get object with this pk
        stock = get_object_or_404(Stock.objects.all(), pk=pk)
        stock.delete()
        return Response({"sucess": "Stock with id `{}` has been deleted.".format(pk)})

