from django.db import models
from django.conf import settings


class ResumeDetails(models.Model):
    # user = models.ForeignKey(
    #     settings.AUTH_USER_MODEL,
    #     on_delete=models.CASCADE,
    #     related_name='resume_details'
    # )
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    address = models.TextField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    summary = models.TextField(blank=True, null=True)

    # JSON fields for skills, education, experience, certifications, and projects
    skills = models.JSONField(default=list, blank=True)
    education = models.JSONField(default=list, blank=True)
    experience = models.JSONField(default=list, blank=True)
    certifications = models.JSONField(default=list, blank=True)
    projects = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.full_name
