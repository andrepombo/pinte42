from django.db import models
from django.utils.translation import gettext_lazy as _

class UpdateData(models.Model):
    """A dummy docstring."""

    last_update = models.DateTimeField(_('Creation date'), help_text=_('Date of the creation'),auto_now_add=True, blank=True)
    trello_request = models.FloatField(default=0, null=True)
    data_input = models.FloatField(default=0, null=True)

    def save(self, *args, **kwargs):
        self.trello_request = round(self.trello_request, 2)
        self.data_input = round(self.data_input, 2)
        super(UpdateData, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.last_update)