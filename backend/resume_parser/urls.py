from django.urls import path
from .views import ResumeParserAPI

urlpatterns = [
    path('parse-resume/', ResumeParserAPI.as_view(), name='parse-resume'),
]
