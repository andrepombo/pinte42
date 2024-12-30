from rest_framework import serializers
from apps.cards.models import Card

class CardSerializer(serializers.ModelSerializer):
    """A dummy docstring."""

    board = serializers.SlugRelatedField(slug_field="board", read_only=True)

    class Meta:
        """A dummy docstring."""
        fields = "__all__"
        model = Card



