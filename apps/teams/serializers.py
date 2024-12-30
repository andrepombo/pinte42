from rest_framework import serializers
from blog.models import Equipe, Colaborador

class EquipeSerializer(serializers.ModelSerializer):

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






