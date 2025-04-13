from django.urls import path
from .views import ContainerList, ContainerDetail

urlpatterns = [
    path('containers/', ContainerList.as_view()),
    path('containers/<int:pk>/', ContainerDetail.as_view()),
]
