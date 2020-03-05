from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from ..models import *

def topProducts(request):
    productos = []
    cantidad = []

    q = FacturaDetail.objects.values('serial__name').annotate(j=Sum())
