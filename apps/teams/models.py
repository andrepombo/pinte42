from django.db import models
from apps.boards.models import Board
from apps.colabs.models import Colaborador


class Equipe(models.Model):
    
    #id = models.CharField(max_length=200, primary_key=True)
    obra = models.ForeignKey(Board, on_delete=models.PROTECT)
    nome = models.CharField(max_length=50)
    
    pintor1 = models.ForeignKey(Colaborador, related_name='%(class)s_pintor1',on_delete=models.CASCADE,null=True, blank=True)
    pintor2 = models.ForeignKey(Colaborador, related_name='%(class)s_pintor2',on_delete=models.CASCADE,null=True, blank=True)  
    pintor3 = models.ForeignKey(Colaborador, related_name='%(class)s_pintor3',on_delete=models.CASCADE,null=True, blank=True)
    pintor4 = models.ForeignKey(Colaborador, related_name='%(class)s_pintor4',on_delete=models.CASCADE,null=True, blank=True)     
   
    def __str__(self):
        """A dummy docstring."""
        return str(self.nome)    