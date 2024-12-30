from rest_framework import serializers, fields
from blog.models import Card, Equipe, Colaborador



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



