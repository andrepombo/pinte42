from rest_framework import serializers, fields
from blog.models import Post, Card, Board, UpdateData, Equipe, Colaborador
from django.conf import settings
from users.models import NewUser
from users.serializers import CustomUserSerializer


class PostSerializer(serializers.ModelSerializer):
    """A dummy docstring."""
    nascimento = fields.DateField(format="%d/%m/%Y")

    class Meta:
        """A dummy docstring."""
        fields = ('category', 'id', 'sobrenome', 'image', 'slug', 'author', 'nome', 'hobbies', 'status',
                  'naturalidade', 'nascimento'
                  )
        model = Post


class BoardSerializer(serializers.ModelSerializer):
    """A dummy docstring."""
    # user = serializers.SlugRelatedField(slug_field="user_name", read_only=True)

    user = serializers.SlugRelatedField(
        slug_field="user_name", queryset=NewUser.objects.all())

    # category_name = serializers.CharField(source='category.name')
    # user_detail = CustomUserSerializer(source='user',read_only=True)
    class Meta:
        """A dummy docstring."""
        fields = "__all__"
        # fields = ('id','board','user','user_detail')
        model = Board


class BoardUpdateSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        slug_field="user_name", queryset=NewUser.objects.all())

    class Meta:
        """A dummy docstring."""
        fields = "__all__"
        model = Board


class EquipeSerializer(serializers.ModelSerializer):

    # @property
    # def full_name(self):
    #     return self.first_name+" "+self.last_name

    pintor1 = serializers.SlugRelatedField(
        slug_field="nome", queryset=Colaborador.objects.all(), required=False)
    pintor2 = serializers.SlugRelatedField(
        slug_field="nome", queryset=Colaborador.objects.all(), required=False)
    pintor3 = serializers.SlugRelatedField(
        slug_field="nome", queryset=Colaborador.objects.all(), required=False)
    pintor4 = serializers.SlugRelatedField(
        slug_field="nome", queryset=Colaborador.objects.all(), required=False)

    class Meta:
        """A dummy docstring."""
        fields = "__all__"
        model = Equipe


class UpdateSerializer(serializers.ModelSerializer):
    """A dummy docstring."""
    # user = serializers.SlugRelatedField(slug_field="user_name", read_only=True)
    class Meta:
        """A dummy docstring."""
        fields = "__all__"
        model = UpdateData


class ColaboradorSerializer(serializers.ModelSerializer):
    """A dummy docstring."""

    class Meta:
        """A dummy docstring."""
        fields = "__all__"
        model = Colaborador


class ColabEquipesSerializer(serializers.ModelSerializer):
    """A dummy docstring."""
    obra = serializers.SlugRelatedField(slug_field="board", read_only=True)
    obra_id = serializers.StringRelatedField()  
    class Meta:
        """A dummy docstring."""
        fields = "__all__"
        model = Equipe


class CardSerializer(serializers.ModelSerializer):
    """A dummy docstring."""

    board = serializers.SlugRelatedField(slug_field="board", read_only=True)

    class Meta:
        """A dummy docstring."""
        fields = "__all__"
        model = Card



