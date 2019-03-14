from rest_framework import serializers

from writers_den.story.models import Story


class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = '__all__'
