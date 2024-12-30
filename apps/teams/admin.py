from django.contrib import admin
from . import models


@admin.register(models.Equipe)
class EquipeAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome','obra', 'pintor1', 'pintor2','pintor3','pintor4')
    list_filter = ("obra", 'pintor1')