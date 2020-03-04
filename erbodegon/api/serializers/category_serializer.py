from rest_framework import serializers

from ..models import Category

# PRODUCT SERIALIZER
class CategorySerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    name = serializers.CharField(max_length=120)
    is_available = serializers.BooleanField()

    def create(self, validated_data):
        return Category.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.is_available = validated_data.get('is_available', instance.is_available)

        instance.save()
        return instance
    