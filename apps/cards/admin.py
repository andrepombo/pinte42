from django.contrib import admin
from . import models

@admin.register(models.Card)
class CardAdmin(admin.ModelAdmin):
    list_filter = ("board", "pacote", "complete","macro")
    list_display = ('id','board', 'card','macro','pacote','checklist','complete','cardUrl')
