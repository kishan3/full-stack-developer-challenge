import pytest
from mixer.backend.django import mixer

pytestmark = pytest.mark.django_db


class TestStory:
    def test_model(self):
        story = mixer.blend('story.Story', title="Test Title",
                            text="Test Text")
        assert story.id == 1
        assert story.title == "Test Title"
        assert story.text == "Test Text"
        assert str(story) == "Test Title"
