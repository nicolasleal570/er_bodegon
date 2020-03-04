from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from ..models import Usuario
from ..serializers.usuario_serializer import UsuarioSerializer

#-- PRODUCT VIEW --#
class UsuarioView(APIView):
    # HTTP GET
    def get(self, request):
        # usuarios = Usuario.objects.raw('SELECT * FROM usuario_usuario WHERE name = "Articulo 3 de la api"')
        usuarios = Usuario.objects.all()
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response({"usuarios": serializer.data})

    # HTTP POST
    def post(self, request):
        usuario = request.data.get('usuario')

        serializer = UsuarioSerializer(data=usuario)
        if serializer.is_valid(raise_exception=True):
            usuario_saved = serializer.save()
        return Response({
            "success": "Usuario '{}' created successfully".format(usuario_saved.name),
            "usuario": serializer.data
        })

    # HTTP PUT
    def put(self, request, pk):
        saved_usuario = get_object_or_404(Usuario.objects.all(), pk=pk)
        data = request.data.get('usuario')
        serializer = UsuarioSerializer(instance=saved_usuario, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            usuario_saved = serializer.save()
        return Response({
            "success": "Usuario '{}' updated successfully".format(usuario_saved.name),
            "usuario": serializer.data
        })

    # HTTP DELETE
    def delete(self, request, pk):
        # Get object with this pk
        usuario = get_object_or_404(Usuario.objects.all(), pk=pk)
        usuario.delete()
        return Response({"sucess": "Usuario with id `{}` has been deleted.".format(pk)})

