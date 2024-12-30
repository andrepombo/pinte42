from django.db import models
from apps.boards.models import Board

class Card(models.Model):
    id = models.CharField(max_length=200, primary_key=True)
    
    board = models.ForeignKey(Board, on_delete=models.PROTECT)
    card = models.CharField(max_length=200)
    card2 = models.CharField(max_length=200)
    local = models.CharField(max_length=200)
    macro = models.CharField(max_length=200, default=None, null=True)
    cardUrl = models.CharField(max_length=200)
    cardActive = models.CharField(max_length=200)
    checklist = models.CharField(max_length=200)
    pacote = models.CharField(max_length=200)
    
    item1 = models.CharField(max_length=200)
    item2 = models.CharField(max_length=200)
    item3 = models.CharField(max_length=200)
    item4 = models.CharField(max_length=200)
    item5 = models.CharField(max_length=200)

    i1_status = models.CharField(max_length=200)
    i2_status = models.CharField(max_length=200)
    i3_status = models.CharField(max_length=200)
    i4_status = models.CharField(max_length=200)
    i5_status = models.CharField(max_length=200)

    i1_user = models.CharField(max_length=200)
    i2_user = models.CharField(max_length=200)
    i3_user = models.CharField(max_length=200)
    i4_user = models.CharField(max_length=200)
    i5_user = models.CharField(max_length=200)

    i1_date_auto = models.DateTimeField(default=None,blank=True, null=True)
    i2_date_auto = models.DateTimeField(default=None,blank=True, null=True)
    i3_date_auto = models.DateTimeField(default=None,blank=True, null=True)
    i4_date_auto = models.DateTimeField(default=None,blank=True, null=True)
    i5_date_auto = models.DateTimeField(default=None,blank=True, null=True)

    i1_data = models.CharField(max_length=200)
    i2_data = models.CharField(max_length=200)
    i3_data = models.CharField(max_length=200)
    
    med = models.CharField(max_length=200)
    equipe = models.CharField(max_length=200)
    hour = models.CharField(max_length=200)
    code = models.CharField(max_length=200)
    complete = models.IntegerField()
    
    def __str__(self):
        """A dummy docstring."""
        return str(self.card)
