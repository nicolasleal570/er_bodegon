from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from ..models import Delivery
from ..serializers.delivery_serializer import DeliverySerializer

#-- PRODUCT VIEW --#
class DeliveryView(APIView):
    # HTTP GET
    def get(self, request):
        # deliveries = Delivery.objects.raw('SELECT * FROM delivery_delivery WHERE id = "Articulo 3 de la api"')
        deliveries = Delivery.objects.all()
        serializer = DeliverySerializer(deliveries, many=True)
        return Response({"deliveries": serializer.data})

    # HTTP POST
    def post(self, request):
        delivery = request.data.get('delivery')

        serializer = DeliverySerializer(data=delivery)
        if serializer.is_valid(raise_exception=True):
            delivery_saved = serializer.save()
        return Response({
            "success": "Delivery '{}' created successfully".format(delivery_saved.id),
            "delivery": delivery
        })

    # HTTP PUT
    def put(self, request, pk):
        saved_delivery = get_object_or_404(Delivery.objects.all(), pk=pk)
        data = request.data.get('delivery')
        serializer = DeliverySerializer(instance=saved_delivery, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            delivery_saved = serializer.save()
        return Response({
            "success": "Delivery '{}' updated successfully".format(delivery_saved.id),
            "delivery": data
        })

    # HTTP DELETE
    def delete(self, request, pk):
        # Get object with this pk
        delivery = get_object_or_404(Delivery.objects.all(), pk=pk)
        delivery.delete()
        return Response({"sucess": "Delivery with id `{}` has been deleted.".format(pk)})

