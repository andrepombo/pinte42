from django.db import models
from django.conf import settings


class Board(models.Model):
    
    options = (
        ('Ativa', 'Ativa'),
        ('Inativa', 'Inativa'),
    )
    id = models.CharField(max_length=200, primary_key=True)
    year = models.IntegerField(null=True, blank=True)
    construtora = models.CharField(max_length=200, null=True, blank=True)
    board = models.CharField(max_length=200)
    status = models.CharField(
        max_length=20, choices=options, default='Ativa')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)
    
    def __str__(self):
        """A dummy docstring."""
        return str(self.board)   
    