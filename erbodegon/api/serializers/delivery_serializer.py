from rest_framework import serializers

from ..models import Delivery

# PRODUCT SERIALIZER
class DeliverySerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    direction = serializers.CharField(max_length=200)
    discount = serializers.IntegerField()
    delivery_time = serializers.TimeField()
    is_available = serializers.BooleanField()

    def create(self, validated_data):
        return Delivery.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.direction = validated_data.get('direction', instance.direction)
        instance.discount = validated_data.get('discount', instance.discount)
        instance.delivery_time = validated_data.get('delivery_time', instance.delivery_time)
        instance.is_available = validated_data.get('is_available', instance.is_available)

        instance.save()
        return instance
    