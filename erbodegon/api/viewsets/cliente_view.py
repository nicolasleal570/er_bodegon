from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from ..models import Cliente
from ..serializers.cliente_serializer import ClienteSerializer

#-- PRODUCT VIEW --#
class ClienteView(APIView):
    # HTTP GET
    def get(self, request):
        # clientes = Cliente.objects.raw('SELECT * FROM cliente_cliente WHERE id = "Articulo 3 de la api"')
        clientes = Cliente.objects.all()
        serializer = ClienteSerializer(clientes, many=True)
        return Response({"clientes": serializer.data})

    # HTTP POST
    def post(self, request):
        cliente = request.data.get('cliente')

        serializer = ClienteSerializer(data=cliente)
        if serializer.is_valid(raise_exception=True):
            cliente_saved = serializer.save()
        return Response({
            "success": "Cliente '{}' created successfully".format(cliente_saved.id),
            "cliente": serializer.data
        })

    # HTTP PUT
    def put(self, request, pk):
        saved_cliente = get_object_or_404(Cliente.objects.all(), pk=pk)
        data = request.data.get('cliente')
        serializer = ClienteSerializer(instance=saved_cliente, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            cliente_saved = serializer.save()
        return Response({
            "success": "Cliente '{}' updated successfully".format(cliente_saved.id),
            "cliente": serializer.data
        })

    # HTTP DELETE
    def delete(self, request, pk):
        # Get object with this pk
        cliente = get_object_or_404(Cliente.objects.all(), pk=pk)
        cliente.delete()
        return Response({"sucess": "Cliente with id `{}` has been deleted.".format(pk)})

