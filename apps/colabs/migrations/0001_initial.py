# Generated by Django 3.2 on 2024-12-30 21:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Colaborador',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=200)),
                ('matricula', models.CharField(blank=True, max_length=200, null=True)),
                ('cpf', models.CharField(blank=True, max_length=200, null=True)),
                ('telefone', models.CharField(blank=True, max_length=200, null=True)),
                ('status', models.CharField(choices=[('Ativo', 'Ativo'), ('Demitido', 'Demitido')], default='Ativo', max_length=20)),
                ('cargo', models.CharField(choices=[('Pintor', 'Pintor'), ('Mestre', 'Mestre'), ('Servente', 'Servente'), ('Auxiliar de Pintor', 'Auxiliar de Pintor'), ('Encarregado de Obras', 'Encarregado de Obras')], default='Pintor', max_length=20)),
            ],
        ),
    ]
