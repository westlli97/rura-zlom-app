from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Container, MATERIAL_CHOICES, TareBox
from rest_framework import status
from .serializers import ContainerSerializer, ContainerEntrySerializer, TareBoxSerializer

from rest_framework.decorators import api_view
from rest_framework.generics import DestroyAPIView
from django.views.decorators.csrf import csrf_exempt

from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views import View
from .models import ShapeSize, ContainerEntry
from django.db.models import Sum, Max
from rest_framework import viewsets



def get_sizes_by_shape(request):
    shape = request.GET.get('shape')
    if not shape:
        return JsonResponse({'error': 'No shape provided'}, status=400)

    sizes = ShapeSize.objects.filter(shape=shape).values('id', 'size_label')
    return JsonResponse(list(sizes), safe=False)

@api_view(['GET'])
def get_material_choices(request):
    choices = [{"value": key, "label": label} for key, label in MATERIAL_CHOICES]
    return Response(choices)


def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})



@csrf_exempt
@api_view(['POST'])
def add_container(request):
    serializer = ContainerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)



def update_container_entries():
    # Oblicz dane z Container
    grouped_entries = (
        Container.objects
        .values('material', 'size_id')
        .annotate(total_weight=Sum('weight_kg'))
    )

    # Lista aktywnych kombinacji material + size_id
    active_keys = set()

    for entry in grouped_entries:
        material = entry['material']
        size_id = entry['size_id']
        total_weight = entry['total_weight']

        container_entry, created = ContainerEntry.objects.get_or_create(
            material=material,
            size_id=size_id,
            defaults={'total_weight_kg': total_weight}
        )

        if not created:
            container_entry.total_weight_kg = total_weight
            container_entry.save()

        active_keys.add((material, size_id))

    # Usuń rekordy ContainerEntry, które nie istnieją już w grouped_entries
    stale_entries = ContainerEntry.objects.exclude(
        material__in=[key[0] for key in active_keys],
        size_id__in=[key[1] for key in active_keys]
    )

    for entry in stale_entries:
        # Usuwamy tylko te, które nie pasują do żadnej pary (material, size_id)
        if (entry.material, entry.size_id) not in active_keys:
            entry.delete()




class WeightSummaryView(APIView):
    def get(self, request):
        summary = (
            ContainerEntry.objects
            .values('material', 'size_id', 'size__shape', 'size__size_label')  # uwzględnij pola z powiązanego ShapeSize
            .annotate(
                total_weight=Sum('total_weight_kg'),
                id=Max('id')  # id ostatniego elementu z grupy (do usuwania)
            )
            .order_by('material', 'size_id')
        )
        # Możesz ewentualnie zrobić formatowanie odpowiedzi na bardziej czytelne:
        response_data = []
        for item in summary:
            response_data.append({
                "material": item['material'],
                "size_id": item['size_id'],
                "shape": item['size__shape'],          # kształt z ShapeSize
                "size_label": item['size__size_label'], # rozmiar z ShapeSize
                "total_weight": float(item['total_weight']),
                "id": item['id'],
            })
        return Response(response_data)

class ContainerList(APIView):
    # GET: Pobieranie dostępnych pojemników
    def get(self, request):
        items = Container.objects.all()
        serializer = ContainerSerializer(items, many=True)
        return Response(serializer.data)

    # POST: Dodawanie nowych pojemników
    def post(self, request):
        serializer = ContainerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            update_container_entries()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContainerDetail(APIView):
    def get_object(self, pk):
        try:
            return Container.objects.get(pk=pk)
        except Container.DoesNotExist:
            return None

    def get(self, request, pk):
        container = self.get_object(pk)
        if not container:
            return Response({"error": "Container not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ContainerSerializer(container)
        return Response(serializer.data)

    def put(self, request, pk):
        container = self.get_object(pk)
        if not container:
            return Response({"error": "Container not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ContainerSerializer(container, data=request.data)
        if serializer.is_valid():
            serializer.save()
            update_container_entries()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        container = self.get_object(pk)
        if not container:
            return Response({"error": "Container not found"}, status=status.HTTP_404_NOT_FOUND)

        container.delete()
        update_container_entries()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ContainerEntryListView(APIView):
    def get(self, request):
        # Pobranie wszystkich wpisów z tabeli ContainerEntry
        entries = ContainerEntry.objects.all()
        # Serializacja danych
        serializer = ContainerEntrySerializer(entries, many=True)
        return Response(serializer.data)

class TareBoxViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TareBox.objects.all()
    serializer_class = TareBoxSerializer

class ContainerEntryDeleteView(DestroyAPIView):
    queryset = ContainerEntry.objects.all()
    serializer_class = ContainerEntrySerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        # Zapamiętaj material i size_id zanim usuniesz entry
        material = instance.material
        size_id = instance.size_id

        # Usuń entry (czyli sumę)
        self.perform_destroy(instance)

        # Usuń wszystkie rekordy źródłowe Container z takim samym material i size_id
        Container.objects.filter(material=material, size_id=size_id).delete()

        return Response(status=status.HTTP_204_NO_CONTENT)