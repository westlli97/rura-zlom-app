
from django.db import models

class Container(models.Model):
    MATERIAL_CHOICES = [
        ('AL', 'Aluminium'),
        ('A304', 'AISI 304'),
        ('A304_Poler', 'AISI 304 Poler'),
        ('A316', 'AISI 316'),
        ('A316_Poler', 'AISI 316 Poler'),
        ('MS', 'Mosiądz'),
    ]
    SHAPE_CHOICES = [
        ('ROUND', 'Okrągły'),
        ('SQUARE', 'Kwadratowy'),
        ('RECT', 'Prostokątny'),
        ('Marcepan',)
    ]

    material = models.CharField(max_length=10, choices=MATERIAL_CHOICES)
    shape = models.CharField(max_length=10, choices=SHAPE_CHOICES)
    weight_kg = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    kg_per_metr = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.get_material_display()} - {self.get_shape_display()}"
