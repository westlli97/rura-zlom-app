from django.contrib import admin
from .models import Container, ShapeSize, TareBox, MaterialSizeDensity, Material, Shape, ContainerEntry

admin.site.register(Container)
admin.site.register(ShapeSize)
admin.site.register(Material)
admin.site.register(Shape)
admin.site.register(ContainerEntry)

@admin.register(MaterialSizeDensity)
class MaterialSizeDensityAdmin(admin.ModelAdmin):
    list_display = ('material', 'size', 'weight_per_meter')
    list_filter = ('material', 'size')
    search_fields = ('material__name', 'size__shape__name', 'size__size_label')

@admin.register(TareBox)
class TareBoxAdmin(admin.ModelAdmin):
    list_display = ('name', 'weight_kg')
    search_fields = ('name',)
    list_filter = ('weight_kg',)
    ordering = ('name',)