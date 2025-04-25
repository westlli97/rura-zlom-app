from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Container, MATERIAL_CHOICES
from rest_framework import status
from .serializers import ContainerSerializer

from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt

from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views import View
from .models import ShapeSize

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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContainerDetail(APIView):
    # GET: Pobieranie pojedynczego pojemnika
    def get(self, request, pk):
        try:
            container = Container.objects.get(pk=pk)
        except Container.DoesNotExist:
            return Response({"error": "Container not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ContainerSerializer(container)
        return Response(serializer.data)

    # PUT/PATCH: Edytowanie danych o pojemniku
    def put(self, request, pk):
        try:
            container = Container.objects.get(pk=pk)
        except Container.DoesNotExist:
            return Response({"error": "Container not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ContainerSerializer(container, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE: Usuwanie pojemnika
    def delete(self, request, pk):
        try:
            container = Container.objects.get(pk=pk)
        except Container.DoesNotExist:
            return Response({"error": "Container not found"}, status=status.HTTP_404_NOT_FOUND)

        container.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




