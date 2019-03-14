from django.db import models


# Create your models here.
from writers_den.user.models import User


class Story(models.Model):
    PUBLISHED = 'P'
    DRAFT = 'D'
    STATUS_CHOICES = (
        (PUBLISHED, 'Published'),
        (DRAFT, 'Draft')
    )
    title = models.CharField(max_length=255)
    text = models.TextField()
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default=DRAFT)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    
