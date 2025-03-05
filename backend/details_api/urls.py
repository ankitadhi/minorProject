from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import *

router = DefaultRouter()
router.register(r'resume-details', ResumeDetailsViewSet,
                basename='resume-details')

urlpatterns = [
    path('', include(router.urls)),
    
]
