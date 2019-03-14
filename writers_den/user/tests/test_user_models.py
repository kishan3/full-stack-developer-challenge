import pytest
from mixer.backend.django import mixer

pytestmark = pytest.mark.django_db


class TestStory:
    def test_model(self):
        user = mixer.blend('user.User', email="test@test.com",
                            name="Test User Name")
        assert user.id == 1
        assert user.email == "test@test.com"
        assert user.name == "Test User Name"
        assert str(user) == "Test User Name"
