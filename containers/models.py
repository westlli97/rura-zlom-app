
from django.db import models


class Material(models.Model):
    code = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Shape(models.Model):
    code = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class ShapeSize(models.Model):
    shape = models.ForeignKey(Shape, on_delete=models.CASCADE)
    size_label = models.CharField(max_length=50)

    class Meta:
        unique_together = ('shape', 'size_label')

    def __str__(self):
        return f"{self.shape.name} - {self.size_label}"


class ContainerEntry(models.Model):
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    size = models.ForeignKey(ShapeSize, on_delete=models.CASCADE)
    total_weight_kg = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.material.name} - {self.size.size_label} - {self.total_weight_kg}"


class Container(models.Model):
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    shape = models.ForeignKey(Shape, on_delete=models.CASCADE)
    weight_kg = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    size = models.ForeignKey(ShapeSize, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.material.name} - {self.shape.name} - {self.weight_kg} kg"


class TareBox(models.Model):
    name = models.CharField(max_length=50)
    weight_kg = models.DecimalField(max_digits=6, decimal_places=2)


class MaterialSizeDensity(models.Model):
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    size = models.ForeignKey(ShapeSize, on_delete=models.CASCADE)
    weight_per_meter = models.DecimalField(max_digits=10, decimal_places=4)

    class Meta:
        unique_together = ('material', 'size')

    def __str__(self):
        return f"{self.material.name} | {self.size} → {self.weight_per_meter} kg/m"