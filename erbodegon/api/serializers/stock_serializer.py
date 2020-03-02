from rest_framework import serializers

from ..models import Stock

# PRODUCT SERIALIZER
class StockSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    cantidad = serializers.IntegerField()
    fecha_creacion = serializers.DateTimeField()
    fecha_vencimiento = serializers.DateTimeField()
    product_id = serializers.IntegerField()
    is_available = serializers.BooleanField()

    def create(self, validated_data):
        return Stock.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.cantidad = validated_data.get('cantidad', instance.cantidad)
        instance.fecha_creacion = validated_data.get('fecha_creacion', instance.fecha_creacion)
        instance.fecha_vencimiento = validated_data.get('fecha_vencimiento', instance.fecha_vencimiento)
        instance.product_id = validated_data.get('product_id', instance.product_id)
        instance.is_available = validated_data.get('is_available', instance.is_available)

        instance.save()
        return instance
    