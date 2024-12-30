from django.db import models
from django.conf import settings



class Colaborador(models.Model):

    options1 = (
        ('Ativo', 'Ativo'),
        ('Demitido', 'Demitido'),
    )

    options2 = (
        ('Pintor', 'Pintor'),
        ('Mestre', 'Mestre'),
        ('Servente','Servente'),
        ('Auxiliar de Pintor', 'Auxiliar de Pintor'),
        ('Encarregado de Obras', 'Encarregado de Obras')
    )
    
    #id = models.CharField(max_length=200, primary_key=True)
    nome = models.CharField(max_length=200)
    matricula = models.CharField(null=True, blank=True, max_length=200)
    cpf = models.CharField(null=True, blank=True, max_length=200)
    telefone = models.CharField(null=True, blank=True, max_length=200)
    nascimento = models.DateField(null=True, blank=True, max_length=200),
    status = models.CharField(
        max_length=20, choices=options1, default='Ativo')
    cargo = models.CharField(
        max_length=20, choices=options2, default='Pintor')
    
    def __str__(self):
        """A dummy docstring."""
        return str(self.nome)  