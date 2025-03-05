from rest_framework import serializers


class ResumeUploadSerializer(serializers.Serializer):
    resume = serializers.FileField(
        required=True,
        help_text="Supported formats: PDF, DOCX, TXT"
    )
