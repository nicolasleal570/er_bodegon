from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from ..models import Divisa
from ..serializers.divisa_serializer import DivisaSerializer

#-- PRODUCT VIEW --#
class DivisaView(APIView):
    # HTTP GET
    def get(self, request):
        divisas = Divisa.objects.all()
        serializer = DivisaSerializer(divisas, many=True)
        return Response({"divisas": serializer.data})

    # HTTP POST
    def post(self, request):
        divisa = request.data.get('divisa')

        serializer = DivisaSerializer(data=divisa)
        if serializer.is_valid(raise_exception=True):
            divisa_saved = serializer.save()
        return Response({
            "success": "Divisa '{}' created successfully".format(divisa_saved.tipo),
            "divisa": divisa
        })

    # HTTP PUT
    def put(self, request, pk):
        saved_divisa = get_object_or_404(Divisa.objects.all(), pk=pk)
        data = request.data.get('divisa')
        serializer = DivisaSerializer(instance=saved_divisa, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            divisa_saved = serializer.save()
        return Response({
            "success": "Divisa '{}' updated successfully".format(divisa_saved.tipo),
            "divisa": data
        })

    # HTTP DELETE
    def delete(self, request, pk):
        # Get object with this pk
        divisa = get_object_or_404(Divisa.objects.all(), pk=pk)
        divisa.delete()
        return Response({"sucess": "Divisa with id `{}` has been deleted.".format(pk)})

