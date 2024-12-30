from rest_framework import serializers
from apps.update.models import UpdateData


class UpdateSerializer(serializers.ModelSerializer):
    """A dummy docstring."""
    # user = serializers.SlugRelatedField(slug_field="user_name", read_only=True)
    class Meta:
        """A dummy docstring."""
        fields = "__all__"
        model = UpdateData




