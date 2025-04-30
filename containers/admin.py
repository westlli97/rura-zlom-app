from django.contrib import admin

# Register your models here.

from .models import Container, ShapeSize, TareBox


admin.site.register(Container)
admin.site.register(ShapeSize)

@admin.register(TareBox)
class TareBoxAdmin(admin.ModelAdmin):
    list_display = ('name', 'weight_kg')  # Zmieniaj w zależności od potrzeb
    search_fields = ('name',)  # Dodaj pole do wyszukiwania po nazwie
    list_filter = ('weight_kg',)  # Możliwość filtrowania po wadze
    ordering = ('name',)  # Domyślne sortowanie
