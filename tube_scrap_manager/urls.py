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
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from containers.views import csrf_token_view
from containers.views import TareBoxViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'tares', TareBoxViewSet, basename='tares')

@ensure_csrf_cookie
def get_csrf(request):
    return JsonResponse({'detail': 'CSRF cookie set'})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/csrf/', csrf_token_view),
    path('csrf/', csrf_token_view),
    path('api/', include('containers.urls')),  # ścieżki do API Django REST Framework
    # Wszystkie pozostałe adresy przekierowujemy do frontendu React
    #re_path(r'^.*$', FrontendAppView.as_view(), name='frontend'),
    re_path(r'^(?!admin|api).*$', FrontendAppView.as_view(), name='frontend'),
]