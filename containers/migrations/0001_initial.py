# Generated by Django 5.2 on 2025-04-12 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Container',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('material', models.CharField(choices=[('AL', 'Aluminium'), ('A304', 'AISI 304'), ('A304_Poler', 'AISI 304 Poler'), ('A316', 'AISI 316'), ('A316_Poler', 'AISI 316 Poler'), ('MS', 'Mosiądz')], max_length=10)),
                ('shape', models.CharField(choices=[('ROUND', 'Okrągły'), ('SQUARE', 'Kwadratowy'), ('RECT', 'Prostokątny'), ('D_Shape', 'Marcepan')], max_length=10)),
                ('weight_kg', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('kg_per_metr', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
            ],
        ),
    ]
