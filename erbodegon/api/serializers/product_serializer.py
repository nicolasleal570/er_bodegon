from rest_framework import serializers

from ..models import Product

# PRODUCT SERIALIZER
class ProductSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    name = serializers.CharField(max_length=120)
    description = serializers.CharField()

    def create(self, validated_data):
        return Product.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.title)
        instance.description = validated_data.get('description', instance.description)

        instance.save()
        return instance