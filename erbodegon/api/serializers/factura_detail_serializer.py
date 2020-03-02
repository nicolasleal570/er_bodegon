from rest_framework import serializers

from ..models import FacturaDetail

# PRODUCT SERIALIZER
class FacturaDetailSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    price_per_unit = serializers.FloatField()
    iva = serializers.FloatField()
    quantity = serializers.IntegerField()
    factura_id = serializers.IntegerField()
    product_id = serializers.IntegerField()
    is_available = serializers.BooleanField()

    def create(self, validated_data):
        return FacturaDetail.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.price_per_unit = validated_data.get('price_per_unit', instance.price_per_unit)
        instance.iva = validated_data.get('iva', instance.iva)
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.factura_id = validated_data.get('factura_id', instance.factura_id)
        instance.product_id = validated_data.get('product_id', instance.product_id)
        instance.is_available = validated_data.get('is_available', instance.is_available)

        instance.save()
        return instance
    