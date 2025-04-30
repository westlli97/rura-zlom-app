from rest_framework import serializers
from .models import Container, ContainerEntry, MATERIAL_CHOICES, TareBox


MATERIAL_DICT = dict(MATERIAL_CHOICES)


class ContainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Container
        fields = '__all__'

class ContainerEntrySerializer(serializers.ModelSerializer):
    size_label = serializers.CharField(source='size.size_label', read_only=True)
    material_name = serializers.SerializerMethodField()

    class Meta:
        model = ContainerEntry
        fields = ['material', 'material_name', 'total_weight_kg', 'size_label']

    def get_material_name(self, obj):
        return MATERIAL_DICT.get(obj.material, obj.material)

class TareBoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = TareBox
        fields = '__all__'