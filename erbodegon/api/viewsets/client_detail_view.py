from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from ..models import Cliente
from ..serializers.cliente_serializer import ClienteSerializer

class ClientDetail(APIView):


    def get(self, request, pk):
        snippet = get_object_or_404(Cliente.objects.all(), pk=pk)
        serializer = ClienteSerializer(snippet)
        return Response({
            "cliente": serializer.data
        })