from rest_framework import serializers

from ..models import Empleado, Cliente

# PRODUCT SERIALIZER
class EmpleadoSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    usuario_id = serializers.IntegerField()
    cargo = serializers.CharField(max_length=150)
    sueldo = serializers.FloatField()
    is_available = serializers.BooleanField()

    def create(self, validated_data):
        return Empleado.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.usuario_id = validated_data.get('usuario_id', instance.usuario_id)
        instance.cargo = validated_data.get('cargo', instance.cargo)
        instance.sueldo = validated_data.get('sueldo', instance.sueldo)
        instance.is_available = validated_data.get('is_available', instance.is_available)

        instance.save()
        return instance
    