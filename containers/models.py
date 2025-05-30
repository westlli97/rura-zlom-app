
from django.db import models



MATERIAL_CHOICES = [
    ('AL_SUR', 'Aluminium Surowe'),
    ('AL_C35', 'Aluminium Anoda Czarna C35'),
    ('AL_C30', 'Aluminium Anoda Srebrna C30'),
    ('AL_SG', 'Aluminium Anoda Srebrna Gładka'),
    ('AL_C31', 'Aluminium Anoda Inox C31'),
    ('AL_LAK_CZ', 'Aluminium Lakier Czarny'),
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
    ('Other', 'Inny')
]
SIZE_CHOICES = [
    ('Fi22', 'Fi22'),
    ('Fi25', 'Fi25'),
    ('Fi30', 'Fi30'),
    ('Fi40', 'Fi40'),
    ('Fi50', 'Fi50'),
    ('40x40', '40x40'),
    ('25x25', '25x25'),
    ('30x30', '30x30'),
    ('30x10', '30x10'),
    ('40x10', '40x10'),
    ('40x20', '40x20'),
    ('50x25', '50x25'),
    ('100x20', '100x20'),
    ('Owal', 'Owal'),
    ('Marcepan', 'Marcepan'),
    ('Kieszen', 'Kieszeniówka'),
    ('45x45', '45x45'),
    ('Fi30x1.0', 'Fi30x1.0'),
    ('60x60', '60x60'),
    ('Fi25x1.0', 'Fi25x1.0'),

]



class ShapeSize(models.Model):
    shape = models.CharField(max_length=10, choices=SHAPE_CHOICES)
    size_label = models.CharField(max_length=20, choices=SIZE_CHOICES)  # Wybór rozmiaru

    class Meta:
        unique_together = ('shape', 'size_label')

    def __str__(self):
        return f"{self.shape} - {self.size_label}"


class ContainerEntry(models.Model):
    material = models.CharField(max_length=100)  # albo ForeignKey
    size = models.ForeignKey(ShapeSize, on_delete=models.CASCADE)
    total_weight_kg = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.material} - {self.size.size_label} - {self.total_weight_kg}"


class Container(models.Model):
    material = models.CharField(max_length=10, choices=MATERIAL_CHOICES)
    shape = models.CharField(max_length=10, choices=SHAPE_CHOICES)
    weight_kg = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    size = models.ForeignKey(ShapeSize, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)




    def __str__(self):
        return f"{self.get_material_display()} - {self.get_shape_display()} - {self.weight_kg} kg"



class TareBox(models.Model):
    name = models.CharField(max_length=50)
    weight_kg = models.DecimalField(max_digits=6, decimal_places=2)


class MaterialSizeDensity(models.Model):
    material = models.CharField(max_length=100)
    size = models.ForeignKey(ShapeSize, on_delete=models.CASCADE)
    weight_per_meter = models.DecimalField(max_digits=10, decimal_places=4)

    class Meta:
        unique_together = ('material', 'size')

    def __str__(self):
        return f"{self.material} | {self.size} → {self.weight_per_meter} kg/m"