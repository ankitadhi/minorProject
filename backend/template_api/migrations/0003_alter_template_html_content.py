# Generated by Django 5.1.4 on 2025-01-17 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('template_api', '0002_rename_content_template_css_content_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='template',
            name='html_content',
            field=models.TextField(default='<p>Default content</p>'),
        ),
    ]
