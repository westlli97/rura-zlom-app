from django.urls import path
from .views import ContainerList, ContainerDetail, get_material_choices, get_sizes_by_shape, add_container, WeightSummaryView, ContainerEntryListView,ContainerEntryDeleteView
from django.urls import get_resolver, path
from django.http import JsonResponse


def debug_routes_view(request):
    routes = []
    for route in get_resolver().reverse_dict.keys():
        if isinstance(route, str):
            routes.append(route)
    return JsonResponse({'routes': routes})


urlpatterns = [
    path('containers/', ContainerList.as_view(), name='container-list'),
    path('containers/summary/', WeightSummaryView.as_view(), name='weight-summary'),
    path('container-entries/', ContainerEntryListView.as_view(), name='container-entry-list'),
    path('containers/<int:pk>/', ContainerDetail.as_view(), name='container-detail'),
    path('materials/', get_material_choices, name='get-material-choices'),
    path('get-sizes/', get_sizes_by_shape, name='get-sizes-by-shape'),
    #path('add-container/', add_container, name='add-container'),
    path('debug/routes/', debug_routes_view),
    path('entries/<int:pk>/delete/', ContainerEntryDeleteView.as_view(), name='containerentry-delete'),

]