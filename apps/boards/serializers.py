from rest_framework import serializers
from apps.boards.models import Board
from django.conf import settings
from apps.users.models import NewUser



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






