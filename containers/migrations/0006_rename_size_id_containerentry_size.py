# Generated by Django 5.2 on 2025-04-29 19:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('containers', '0005_rename_size_containerentry_size_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='containerentry',
            old_name='size_id',
            new_name='size',
        ),
    ]
