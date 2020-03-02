from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from ..models import Factura
from ..serializers.factura_serializer import FacturaSerializer

#-- PRODUCT VIEW --#
class FacturaView(APIView):
    # HTTP GET
    def get(self, request):
        facturas = Factura.objects.all()
        serializer = FacturaSerializer(facturas, many=True)
        return Response({"facturas": serializer.data})

    # HTTP POST
    def post(self, request):
        factura = request.data.get('factura')

        serializer = FacturaSerializer(data=factura)
        if serializer.is_valid(raise_exception=True):
            factura_saved = serializer.save()
        return Response({
            "success": "Factura '{}' created successfully".format(factura_saved.codigo),
            "factura": factura
        })

    # HTTP PUT
    def put(self, request, pk):
        saved_factura = get_object_or_404(Factura.objects.all(), pk=pk)
        data = request.data.get('factura')
        serializer = FacturaSerializer(instance=saved_factura, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            factura_saved = serializer.save()
        return Response({
            "success": "Factura '{}' updated successfully".format(factura_saved.codigo),
            "factura": data
        })

    # HTTP DELETE
    def delete(self, request, pk):
        # Get object with this pk
        factura = get_object_or_404(Factura.objects.all(), pk=pk)
        factura.delete()
        return Response({"sucess": "Factura with id `{}` has been deleted.".format(pk)})

