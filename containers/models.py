
from django.db import models

class Container(models.Model):
    MATERIAL_CHOICES = [
        ('AL', 'Aluminium'),
        ('A304', 'AISI 304'),
        ('A316', 'AISI 316'),
        ('MS', 'Mosiądz'),
    ]
    SHAPE_CHOICES = [
        ('ROUND', 'Okrągły'),
        ('SQUARE', 'Kwadratowy'),
        ('RECT', 'Prostokątny'),
    ]

    material = models.CharField(max_length=10, choices=MATERIAL_CHOICES)
    shape = models.CharField(max_length=10, choices=SHAPE_CHOICES)
    weight_kg = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    kg_per_metr = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.get_material_display()} - {self.get_shape_display()}"
