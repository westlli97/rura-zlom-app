from django.views.generic import View
from django.shortcuts import render
import os
from django.http import FileResponse


class FrontendAppView(View):
    def get(self, request):
        file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'frontend', 'build', 'index.html')
        return FileResponse(open(file_path, 'rb'))