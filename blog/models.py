from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


def upload_to(instance, filename):
    """A dummy docstring."""
    return 'posts/{filename}'.format(filename=filename)

class Category(models.Model):
    """A dummy docstring."""
    name = models.CharField(max_length=200)

    def __str__(self):
        return str(self.name)


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
    
    
    def __str__(self):
        """A dummy docstring."""
        return str(self.board)
    
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
    


class Post(models.Model):
    """A dummy docstring."""
    class PostObjects(models.Manager):
        """A dummy docstring."""
        def get_queryset(self):
            """A dummy docstring."""
            return super().get_queryset().filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, default=1)
    sobrenome = models.CharField(_('sobrenome'),max_length=250)
    nome = models.CharField(max_length=250)
    nascimento = models.DateField(null=True)
    naturalidade = models.CharField(max_length=250)
    image = models.ImageField(
        _("Image"), upload_to=upload_to, default='posts/man.png', null=True)
    hobbies = models.TextField(null=True)
    # slug = models.SlugField(max_length=250, unique_for_date='published')
    slug = models.SlugField(max_length=250,blank=True, null=True)
    published = models.DateField(default=timezone.now)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='blog_posts')
    status = models.CharField(
        max_length=10, choices=options, default='published')
    objects = models.Manager()  # default manager
    postobjects = PostObjects()  # custom manager

    class Meta:
        """A dummy docstring."""
        ordering = ('-published',)

    def __str__(self):
        """A dummy docstring."""
        return str(self.nome)
