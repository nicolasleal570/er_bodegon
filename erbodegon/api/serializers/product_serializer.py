from rest_framework import serializers

from ..models import Product

# PRODUCT SERIALIZER
class ProductSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    name = serializers.CharField(max_length=120)
    codigo = serializers.FloatField()
    costo = serializers.FloatField()
    descuento = serializers.IntegerField()
    is_available = serializers.BooleanField()

    def create(self, validated_data):
        return Product.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.codigo = validated_data.get('codigo', instance.codigo)
        instance.costo = validated_data.get('costo', instance.costo)
        instance.descuento = validated_data.get('descuento', instance.descuento)
        instance.is_available = validated_data.get('is_available', instance.is_available)

        instance.save()
        return instance
    