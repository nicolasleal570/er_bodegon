from rest_framework import serializers

from ..models import Instrumento

# PRODUCT SERIALIZER
class InstrumentoSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    tipo = serializers.CharField(max_length=50)
    codigo = serializers.IntegerField()
    mount = serializers.FloatField()
    is_available = serializers.BooleanField()

    def create(self, validated_data):
        return Instrumento.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.tipo = validated_data.get('tipo', instance.tipo)
        instance.codigo = validated_data.get('codigo', instance.codigo)
        instance.mount = validated_data.get('mount', instance.mount)
        instance.is_available = validated_data.get('is_available', instance.is_available)

        instance.save()
        return instance
    