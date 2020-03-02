from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from ..models import Pago
from ..serializers.pago_serializer import PagoSerializer

#-- PRODUCT VIEW --#
class PagoView(APIView):
    # HTTP GET
    def get(self, request):
        pagos = Pago.objects.all()
        serializer = PagoSerializer(pagos, many=True)
        return Response({"pagos": serializer.data})

    # HTTP POST
    def post(self, request):
        pago = request.data.get('pago')

        serializer = PagoSerializer(data=pago)
        if serializer.is_valid(raise_exception=True):
            pago_saved = serializer.save()
        return Response({
            "success": "Pago '{}' created successfully".format(pago_saved.id),
            "pago": pago
        })

    # HTTP PUT
    def put(self, request, pk):
        saved_pago = get_object_or_404(Pago.objects.all(), pk=pk)
        data = request.data.get('pago')
        serializer = PagoSerializer(instance=saved_pago, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            pago_saved = serializer.save()
        return Response({
            "success": "Pago '{}' updated successfully".format(pago_saved.id),
            "pago": data
        })

    # HTTP DELETE
    def delete(self, request, pk):
        # Get object with this pk
        pago = get_object_or_404(Pago.objects.all(), pk=pk)
        pago.delete()
        return Response({"sucess": "Pago with id `{}` has been deleted.".format(pk)})

