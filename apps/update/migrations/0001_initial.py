# Generated by Django 3.2 on 2024-12-30 21:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UpdateData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_update', models.DateTimeField(auto_now_add=True, help_text='Date of the creation', verbose_name='Creation date')),
                ('trello_request', models.FloatField(default=0, null=True)),
                ('data_input', models.FloatField(default=0, null=True)),
            ],
        ),
    ]
