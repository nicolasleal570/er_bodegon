from rest_framework import serializers

from ..models import Cliente

# PRODUCT SERIALIZER
class ClienteSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    usuario_id = serializers.IntegerField()
    tipo = serializers.CharField(max_length=150)
    is_available = serializers.BooleanField()

    def create(self, validated_data):
        return Cliente.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.usuario_id = validated_data.get('usuario_id', instance.usuario_id)
        instance.tipo = validated_data.get('tipo', instance.tipo)
        instance.is_available = validated_data.get('is_available', instance.is_available)

        instance.save()
        return instance
    