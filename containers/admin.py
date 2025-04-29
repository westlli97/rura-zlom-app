from django.contrib import admin

# Register your models here.

from .models import Container
from .models import ShapeSize

admin.site.register(Container)
admin.site.register(ShapeSize)
