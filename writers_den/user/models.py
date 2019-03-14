from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from rest_framework.exceptions import ValidationError


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, is_staff, is_superuser, **extra_fields):
        """Create and saves a User with given email and password."""

        email = self.normalize_email(email)
        if not email:
            msg = 'Users must have valid email address'
            raise ValidationError({'email': msg})

        user = self.model(email=email, is_staff=is_staff, is_superuser=is_superuser, **extra_fields)

        user.set_password(password)

        user.save(using=self._db)

        return user

    def create_user(self, email, password=None, **extra_fields):
        return self._create_user(email, password, False, False, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        return self._create_user(email, password, True, True, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """A fully featured custom User model with admin-compliant permissions."""

    email = models.EmailField(
        max_length=255,
        unique=True,
        verbose_name='Email Address',
        help_text='Should be valid email, e.g. john@example.com')
    name = models.CharField(
        max_length=30,
        blank=False,
        verbose_name='Name',
        help_text='John')

    is_staff = models.BooleanField(
        default=False,
        verbose_name='Admin Status',
        help_text='Designates whether the user can log into admin site.')
    is_active = models.BooleanField(
        default=True,
        verbose_name='Active Status',
        help_text='Designates whether this user should be treated as active.')

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    @property
    def is_admin(self):
        return self.is_staff or self.is_superuser


User._meta.get_field('password').blank = True
