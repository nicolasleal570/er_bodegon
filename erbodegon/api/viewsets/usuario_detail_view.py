from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from ..models import Usuario
from ..serializers.usuario_serializer import UsuarioSerializer

class UsuarioDetail(APIView):


    def get(self, request, pk):
        snippet = get_object_or_404(Usuario.objects.all(), pk=pk)
        serializer = UsuarioSerializer(snippet)
        return Response({
            "usuario": serializer.data
        })