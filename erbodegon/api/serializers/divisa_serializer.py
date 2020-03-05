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
        instance.tipo = validated_data.get('tipo', instance.tipo)
        instance.tasa = validated_data.get('tasa', instance.tasa)
        instance.is_available = validated_data.get('is_available', instance.is_available)

        instance.save()
        return instance
    