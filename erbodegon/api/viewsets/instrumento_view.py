from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from ..models import Instrumento
from ..serializers.instrumento_serializer import InstrumentoSerializer

#-- PRODUCT VIEW --#
class InstrumentoView(APIView):
    # HTTP GET
    def get(self, request):
        # instrumentos = Instrumento.objects.raw('SELECT * FROM instrumento_instrumento WHERE name = "Articulo 3 de la api"')
        instrumentos = Instrumento.objects.all()
        serializer = InstrumentoSerializer(instrumentos, many=True)
        return Response({"instrumentos": serializer.data})

    # HTTP POST
    def post(self, request):
        instrumento = request.data.get('instrumento')

        serializer = InstrumentoSerializer(data=instrumento)
        if serializer.is_valid(raise_exception=True):
            instrumento_saved = serializer.save()
        return Response({
            "success": "Instrumento '{}' created successfully".format(instrumento_saved.name),
            "instrumento": instrumento
        })

    # HTTP PUT
    def put(self, request, pk):
        saved_instrumento = get_object_or_404(Instrumento.objects.all(), pk=pk)
        data = request.data.get('instrumento')
        serializer = InstrumentoSerializer(instance=saved_instrumento, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            instrumento_saved = serializer.save()
        return Response({
            "success": "Instrumento '{}' updated successfully".format(instrumento_saved.name),
            "instrumento": data
        })

    # HTTP DELETE
    def delete(self, request, pk):
        # Get object with this pk
        instrumento = get_object_or_404(Instrumento.objects.all(), pk=pk)
        instrumento.delete()
        return Response({"sucess": "Instrumento with id `{}` has been deleted.".format(pk)})

