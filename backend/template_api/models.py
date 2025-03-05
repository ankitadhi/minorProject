from django.db import models

# Create your models here.
from django.db import models


class Template(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='templates/images/')
    html_content = models.TextField(null=False, blank=False, default="<p>Default content</p>")
    css_content = models.TextField()

    def __str__(self):
        return self.name
