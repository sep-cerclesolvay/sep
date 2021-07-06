from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class UserManager(BaseUserManager):
    def create_user(self, name, password=None):
        """
        Creates and saves a user with the given name and password.
        """
        if not name:
            raise ValueError('Users must have a name')

        user = self.model(
            name=name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, name, password):
        """
        Creates and saves a superuser with the given name and password.
        """
        user = self.create_user(
            name,
            password=password,
        )
        user.admin = True
        user.superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    objects = UserManager()
    name = models.CharField(max_length=24, unique=True)
    is_active = models.BooleanField(default=True)
    admin = models.BooleanField(default=False)  # a admin user; non super-user
    superuser = models.BooleanField(default=False)  # a superuser

    # notice the absence of a "Password field", that is built in.

    USERNAME_FIELD = 'name'
    REQUIRED_FIELDS = []  # Email & Password are required by default.

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        if self.is_active and self.superuser:
            return True
        return False

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        if self.is_active and self.superuser:
            return True
        return False

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return True

    @property
    def is_admin(self):
        "Is the user a admin member?"
        return self.superuser

    def __str__(self) -> str:
        return f'{self.name}'
