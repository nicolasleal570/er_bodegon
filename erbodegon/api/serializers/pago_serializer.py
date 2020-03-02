from rest_framework import serializers

from ..models import Pago

# PRODUCT SERIALIZER
class PagoSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    mount = serializers.FloatField()
    divisa_id = serializers.IntegerField()
    is_available = serializers.BooleanField()

    def create(self, validated_data):
        return Pago.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.mount = validated_data.get('mount', instance.mount)
        instance.divisa_id = validated_data.get('divisa_id', instance.divisa_id)
        instance.is_available = validated_data.get('is_available', instance.is_available)

        instance.save()
        return instance
    