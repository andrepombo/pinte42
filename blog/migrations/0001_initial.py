# Generated by Django 3.2 on 2024-02-06 20:11

import blog.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Board',
            fields=[
                ('id', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('board', models.CharField(max_length=200)),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='BoardEpi',
            fields=[
                ('id', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('board', models.CharField(max_length=200)),
                ('card', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Colaborador',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=200)),
                ('matricula', models.CharField(blank=True, max_length=200, null=True)),
                ('cpf', models.CharField(blank=True, max_length=200, null=True)),
                ('telefone', models.CharField(blank=True, max_length=200, null=True)),
                ('status', models.CharField(choices=[('Ativo', 'Ativo'), ('Demitido', 'Demitido')], default='Ativo', max_length=20)),
                ('cargo', models.CharField(choices=[('Pintor', 'Pintor'), ('Mestre', 'Mestre'), ('Servente', 'Servente'), ('Auxiliar de Pintor', 'Auxiliar de Pintor'), ('Encarregado de Obras', 'Encarregado de Obras')], default='Pintor', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Epi',
            fields=[
                ('id', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('board', models.CharField(max_length=200)),
                ('card', models.CharField(max_length=200)),
                ('cardUrl', models.CharField(max_length=200)),
                ('checklist', models.CharField(max_length=200)),
                ('item1', models.CharField(max_length=200)),
                ('item2', models.CharField(max_length=200)),
                ('item3', models.CharField(max_length=200)),
                ('item4', models.CharField(max_length=200)),
                ('item5', models.CharField(max_length=200)),
                ('item6', models.CharField(max_length=200)),
                ('item7', models.CharField(max_length=200)),
                ('item8', models.CharField(max_length=200)),
                ('item9', models.CharField(max_length=200)),
                ('item10', models.CharField(max_length=200)),
                ('i1_status', models.CharField(max_length=200)),
                ('i2_status', models.CharField(max_length=200)),
                ('i3_status', models.CharField(max_length=200)),
                ('i4_status', models.CharField(max_length=200)),
                ('i5_status', models.CharField(max_length=200)),
                ('i6_status', models.CharField(max_length=200)),
                ('i7_status', models.CharField(max_length=200)),
                ('i8_status', models.CharField(max_length=200)),
                ('i9_status', models.CharField(max_length=200)),
                ('i10_status', models.CharField(max_length=200)),
                ('i1_user', models.CharField(blank=True, max_length=200, null=True)),
                ('i2_user', models.CharField(blank=True, max_length=200, null=True)),
                ('i3_user', models.CharField(blank=True, max_length=200, null=True)),
                ('i4_user', models.CharField(blank=True, max_length=200, null=True)),
                ('i5_user', models.CharField(blank=True, max_length=200, null=True)),
                ('i6_user', models.CharField(blank=True, max_length=200, null=True)),
                ('i7_user', models.CharField(blank=True, max_length=200, null=True)),
                ('i8_user', models.CharField(blank=True, max_length=200, null=True)),
                ('i9_user', models.CharField(blank=True, max_length=200, null=True)),
                ('i10_user', models.CharField(blank=True, max_length=200, null=True)),
                ('i1_date_auto', models.DateTimeField(blank=True, default=None, null=True)),
                ('i2_date_auto', models.DateTimeField(blank=True, default=None, null=True)),
                ('i3_date_auto', models.DateTimeField(blank=True, default=None, null=True)),
                ('i4_date_auto', models.DateTimeField(blank=True, default=None, null=True)),
                ('i5_date_auto', models.DateTimeField(blank=True, default=None, null=True)),
                ('i6_date_auto', models.DateTimeField(blank=True, default=None, null=True)),
                ('i7_date_auto', models.DateTimeField(blank=True, default=None, null=True)),
                ('i8_date_auto', models.DateTimeField(blank=True, default=None, null=True)),
                ('i9_date_auto', models.DateTimeField(blank=True, default=None, null=True)),
                ('i10_date_auto', models.DateTimeField(blank=True, default=None, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='UpdateData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_update', models.DateTimeField(auto_now_add=True, help_text='Date of the creation', verbose_name='Creation date')),
                ('trello_request', models.FloatField(default=0, null=True)),
                ('data_input', models.FloatField(default=0, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sobrenome', models.CharField(max_length=250, verbose_name='sobrenome')),
                ('nome', models.CharField(max_length=250)),
                ('nascimento', models.DateField(null=True)),
                ('naturalidade', models.CharField(max_length=250)),
                ('image', models.ImageField(default='posts/man.png', null=True, upload_to=blog.models.upload_to, verbose_name='Image')),
                ('hobbies', models.TextField(null=True)),
                ('slug', models.SlugField(blank=True, max_length=250, null=True)),
                ('published', models.DateField(default=django.utils.timezone.now)),
                ('status', models.CharField(choices=[('draft', 'Draft'), ('published', 'Published')], default='published', max_length=10)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blog_posts', to=settings.AUTH_USER_MODEL)),
                ('category', models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='blog.category')),
            ],
            options={
                'ordering': ('-published',),
            },
        ),
        migrations.CreateModel(
            name='Equipe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=50)),
                ('obra', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='blog.board')),
                ('pintor1', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='equipe_pintor1', to='blog.colaborador')),
                ('pintor2', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='equipe_pintor2', to='blog.colaborador')),
                ('pintor3', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='equipe_pintor3', to='blog.colaborador')),
                ('pintor4', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='equipe_pintor4', to='blog.colaborador')),
            ],
        ),
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('card', models.CharField(max_length=200)),
                ('card2', models.CharField(max_length=200)),
                ('local', models.CharField(max_length=200)),
                ('macro', models.CharField(default=None, max_length=200, null=True)),
                ('cardUrl', models.CharField(max_length=200)),
                ('cardActive', models.CharField(max_length=200)),
                ('checklist', models.CharField(max_length=200)),
                ('pacote', models.CharField(max_length=200)),
                ('item1', models.CharField(max_length=200)),
                ('item2', models.CharField(max_length=200)),
                ('item3', models.CharField(max_length=200)),
                ('item4', models.CharField(max_length=200)),
                ('item5', models.CharField(max_length=200)),
                ('i1_status', models.CharField(max_length=200)),
                ('i2_status', models.CharField(max_length=200)),
                ('i3_status', models.CharField(max_length=200)),
                ('i4_status', models.CharField(max_length=200)),
                ('i5_status', models.CharField(max_length=200)),
                ('i1_user', models.CharField(max_length=200)),
                ('i2_user', models.CharField(max_length=200)),
                ('i3_user', models.CharField(max_length=200)),
                ('i4_user', models.CharField(max_length=200)),
                ('i5_user', models.CharField(max_length=200)),
                ('i1_date_auto', models.DateTimeField(blank=True, default=None, null=True)),
                ('i2_date_auto', models.DateTimeField(blank=True, default=None, null=True)),
                ('i3_date_auto', models.DateTimeField(blank=True, default=None, null=True)),
                ('i4_date_auto', models.DateTimeField(blank=True, default=None, null=True)),
                ('i5_date_auto', models.DateTimeField(blank=True, default=None, null=True)),
                ('i1_data', models.CharField(max_length=200)),
                ('i2_data', models.CharField(max_length=200)),
                ('i3_data', models.CharField(max_length=200)),
                ('med', models.CharField(max_length=200)),
                ('equipe', models.CharField(max_length=200)),
                ('hour', models.CharField(max_length=200)),
                ('code', models.CharField(max_length=200)),
                ('complete', models.IntegerField()),
                ('board', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='blog.board')),
            ],
        ),
    ]