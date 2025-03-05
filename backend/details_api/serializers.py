from rest_framework import serializers
from .models import ResumeDetails


class ResumeDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeDetails
        fields = [
            "id",
            "full_name",
            "email",
            "phone",
            "address",
            "linkedin",
            "summary",
            "skills",
            "education",
            "experience",
            "certifications",
            "projects",
        ]
