# Generated by Django 3.2 on 2024-04-18 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_auto_20240418_0959'),
    ]

    operations = [
        migrations.AlterField(
            model_name='board',
            name='status',
            field=models.CharField(choices=[('Ativa', 'Ativa'), ('Inativa', 'Inativa')], default='Ativa', max_length=20),
        ),
    ]