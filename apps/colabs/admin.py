from django.contrib import admin
from . import models


@admin.register(models.Colaborador)
class ColaboradorAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome','cargo','status')
