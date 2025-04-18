from django.urls import path
from .views import ContainerList, ContainerDetail
from containers import views


urlpatterns = [
    path('containers/', views.add_container),  # POST
    path('containers/', ContainerList.as_view()),
    path('containers/<int:pk>/', ContainerDetail.as_view()),
]
