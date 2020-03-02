from rest_framework import serializers

from ..models import Divisa

# PRODUCT SERIALIZER
class DivisaSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    tasa = serializers.FloatField()
    tipo = serializers.CharField(max_length=50)
    is_available = serializers.BooleanField()


    def create(self, validated_data):
        return Divisa.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.codigo = validated_data.get('codigo', instance.codigo)
        instance.costo = validated_data.get('costo', instance.costo)
        instance.descuento = validated_data.get('descuento', instance.descuento)
        instance.category_id = validated_data.get('category_id', instance.category_id)
        instance.is_available = validated_data.get('is_available', instance.is_available)

        instance.save()
        return instance
    