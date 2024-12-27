from django.contrib import admin
from . import models


# @admin.register(models.Post)
# class PostAdmin(admin.ModelAdmin):
#     list_display = ('sobrenome', 'id', 'status', 'slug', 'author', "nascimento")
#     # prepopulated_fields = {'slug': ('sobrenome',), }
    
@admin.register(models.Card)
class CardAdmin(admin.ModelAdmin):
    list_filter = ("board", "pacote", "complete","macro")
    list_display = ('id','board', 'card','macro','pacote','checklist','complete','cardUrl')

@admin.register(models.Board)
class BoardAdmin(admin.ModelAdmin):
    list_display = ('id', 'board', 'user')

@admin.register(models.Equipe)
class EquipeAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome','obra', 'pintor1', 'pintor2','pintor3','pintor4')
    list_filter = ("obra", 'pintor1')

@admin.register(models.Colaborador)
class ColaboradorAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome','cargo','status')
   

@admin.register(models.UpdateData)
class UpdateAdmin(admin.ModelAdmin):
    list_display = ('id','last_update', 'trello_request', 'data_input')

#admin.site.register(models.UpdateData)

#admin.site.register(models.Category)
