from django.urls import path
from .views import ContainerList, ContainerDetail
from containers import views
from .views import get_sizes_by_shape



urlpatterns = [
    path('containers/', views.add_container),  # POST
    path('containers/', ContainerList.as_view()),
    path('containers/<int:pk>/', ContainerDetail.as_view()),
    path('sizes/', get_sizes_by_shape, name='get_sizes_by_shape'),
]
