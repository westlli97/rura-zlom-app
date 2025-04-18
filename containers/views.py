from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Container
from rest_framework import status
from .serializers import ContainerSerializer

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
