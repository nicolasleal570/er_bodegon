from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from ..models import Empleado
from ..serializers.empleado_serializer import EmpleadoSerializer

#-- PRODUCT VIEW --#
class EmpleadoView(APIView):
    # HTTP GET
    def get(self, request):
        # empleados = Empleado.objects.raw('SELECT * FROM empleado_empleado WHERE id = "Articulo 3 de la api"')
        empleados = Empleado.objects.all()
        serializer = EmpleadoSerializer(empleados, many=True)
        return Response({"empleados": serializer.data})

    # HTTP POST
    def post(self, request):
        empleado = request.data.get('empleado')

        serializer = EmpleadoSerializer(data=empleado)
        if serializer.is_valid(raise_exception=True):
            empleado_saved = serializer.save()
        return Response({
            "success": "Empleado '{}' created successfully".format(empleado_saved.id),
            "empleado": serializer.data
        })

    # HTTP PUT
    def put(self, request, pk):
        saved_empleado = get_object_or_404(Empleado.objects.all(), pk=pk)
        data = request.data.get('empleado')
        serializer = EmpleadoSerializer(instance=saved_empleado, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            empleado_saved = serializer.save()
        return Response({
            "success": "Empleado '{}' updated successfully".format(empleado_saved.id),
            "empleado": serializer.data
        })

    # HTTP DELETE
    def delete(self, request, pk):
        # Get object with this pk
        empleado = get_object_or_404(Empleado.objects.all(), pk=pk)
        empleado.delete()
        return Response({"sucess": "Empleado with id `{}` has been deleted.".format(pk)})

