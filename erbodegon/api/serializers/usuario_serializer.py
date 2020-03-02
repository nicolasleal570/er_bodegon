from rest_framework import serializers

from ..models import Usuario

# PRODUCT SERIALIZER
class UsuarioSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    name = serializers.CharField(max_length=200)
    phone = serializers.IntegerField()
    cedula = serializers.IntegerField()
    birthday = serializers.DateField()
    ubication = serializers.CharField(max_length=200)
    is_available = serializers.BooleanField()

    def create(self, validated_data):
        return Usuario.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.cedula = validated_data.get('cedula', instance.cedula)
        instance.birthday = validated_data.get('birthday', instance.birthday)
        instance.ubication = validated_data.get('ubication', instance.ubication)
        instance.is_available = validated_data.get('is_available', instance.is_available)

        instance.save()
        return instance
    