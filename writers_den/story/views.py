# Create your views here.
from rest_framework import viewsets

from writers_den.story.models import Story
from writers_den.story.serializers import StorySerializer


class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer
