from django.contrib import admin

# Register your models here.

from .models import Container, ShapeSize, TareBox, MaterialSizeDensity


admin.site.register(Container)
admin.site.register(ShapeSize)
admin.register(MaterialSizeDensity)

@admin.register(TareBox)
class TareBoxAdmin(admin.ModelAdmin):
    list_display = ('name', 'weight_kg')  # Zmieniaj w zależności od potrzeb
    search_fields = ('name',)  # Dodaj pole do wyszukiwania po nazwie
    list_filter = ('weight_kg',)  # Możliwość filtrowania po wadze
    ordering = ('name',)  # Domyślne sortowanie


class MaterialSizeDensityAdmin(admin.ModelAdmin):
    list_display = ('material', 'size', 'weight_per_meter')
    list_filter = ('material', 'size')
    search_fields = ('material', 'size__shape', 'size__size_label')