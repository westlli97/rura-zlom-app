"""
URL configuration for tube_scrap_manager project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from containers.views import ContainerList

from django.urls import path, include, re_path
from containers import views as api_views  # Twoje API – zmień, jeśli masz oddzielny plik urls dla API
from .frontend_views import FrontendAppView

"""urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/containerlist/', ContainerList.as_view(), name='Container-list'),

]"""
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('containers.urls')),  # ścieżki do API Django REST Framework
    # Wszystkie pozostałe adresy przekierowujemy do frontendu React
    re_path(r'^.*$', FrontendAppView.as_view(), name='frontend'),
]