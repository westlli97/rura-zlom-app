from rest_framework import serializers
from .models import Container, ContainerEntry, TareBox, Material, Shape, ShapeSize


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['id', 'code', 'name', 'is_active']

class ShapeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shape
        fields = ['id', 'code', 'name']

class ShapeSizeSerializer(serializers.ModelSerializer):
    shape_name = serializers.CharField(source='shape.name', read_only=True)
    class Meta:
        model = ShapeSize
        fields = ['id', 'shape', 'shape_name', 'size_label']

class ContainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Container
        fields = '__all__'

class ContainerEntrySerializer(serializers.ModelSerializer):
    size_label = serializers.CharField(source='size.size_label', read_only=True)
    material_name = serializers.CharField(source='material.name', read_only=True)

    class Meta:
        model = ContainerEntry
        fields = ['id', 'material', 'material_name', 'total_weight_kg', 'size_label']

class TareBoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = TareBox
        fields = '__all__'