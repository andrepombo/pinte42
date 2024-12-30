from django.contrib import admin
from . import models

@admin.register(models.UpdateData)
class UpdateAdmin(admin.ModelAdmin):
    list_display = ('id','last_update', 'trello_request', 'data_input')