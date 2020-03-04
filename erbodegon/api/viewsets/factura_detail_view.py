from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from ..models import FacturaDetail
from ..serializers.factura_detail_serializer import FacturaDetailSerializer

#-- PRODUCT VIEW --#
class FacturaDetailView(APIView):
    # HTTP GET
    def get(self, request):
        facturas_detail = FacturaDetail.objects.all()
        serializer = FacturaDetailSerializer(facturas_detail, many=True)
        return Response({"facturas_detail": serializer.data})

    # HTTP POST
    def post(self, request):
        factura_detail = request.data.get('factura_detail')

        serializer = FacturaDetailSerializer(data=factura_detail)
        if serializer.is_valid(raise_exception=True):
            factura_detail_saved = serializer.save()
        return Response({
            "success": "FacturaDetail '{}' created successfully".format(factura_detail_saved.id),
            "facturaDetail": serializer.data
        })

    # HTTP PUT
    def put(self, request, pk):
        saved_factura_detail = get_object_or_404(FacturaDetail.objects.all(), pk=pk)
        data = request.data.get('factura_detail')
        serializer = FacturaDetailSerializer(instance=saved_factura_detail, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            factura_detail_saved = serializer.save()
        return Response({
            "success": "FacturaDetail '{}' updated successfully".format(factura_detail_saved.id),
            "facturaDetail": serializer.data
        })

    # HTTP DELETE
    def delete(self, request, pk):
        # Get object with this pk
        factura_detail = get_object_or_404(FacturaDetail.objects.all(), pk=pk)
        factura_detail.delete()
        return Response({"sucess": "FacturaDetail with id `{}` has been deleted.".format(pk)})

