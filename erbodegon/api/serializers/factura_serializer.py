from rest_framework import serializers

from ..models import Factura

# PRODUCT SERIALIZER
class FacturaSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    total = serializers.IntegerField()
    codigo = serializers.IntegerField()
    pago_id = serializers.IntegerField()
    delivery_id = serializers.IntegerField()
    created_at = serializers.ReadOnlyField()
    cliente_id = serializers.IntegerField()
    is_available = serializers.BooleanField()

    def create(self, validated_data):
        return Factura.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.total = validated_data.get('total', instance.total)
        instance.codigo = validated_data.get('codigo', instance.codigo)
        instance.pago = validated_data.get('pago', instance.pago)
        instance.delivery_id = validated_data.get('delivery_id', instance.delivery_id)
        instance.created_at = validated_data.get('created_at', instance.created_at)
        instance.is_available = validated_data.get('is_available', instance.is_available)

        instance.save()
        return instance
    