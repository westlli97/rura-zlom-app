from django.urls import path
from .views import ContainerList, ContainerDetail, get_material_choices, get_sizes_by_shape, add_container, WeightSummaryView

urlpatterns = [
    path('containers/', ContainerList.as_view(), name='container-list'),
    path('containers/summary/', WeightSummaryView.as_view(), name='weight-summary'),
    path('containers/<int:pk>/', ContainerDetail.as_view(), name='container-detail'),
    path('materials/', get_material_choices, name='get-material-choices'),
    path('get-sizes/', get_sizes_by_shape, name='get-sizes-by-shape'),
    #path('add-container/', add_container, name='add-container'),
]