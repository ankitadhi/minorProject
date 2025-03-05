from django.shortcuts import render
from .models import *
from .serializers import ResumeDataSerializer
from rest_framework import viewsets

# Create your views here.




class ResumeDetailsViewSet(viewsets.ModelViewSet):
    queryset = ResumeDetails.objects.all()  # ✅ Use lowercase "queryset"
    serializer_class = ResumeDataSerializer


