from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    USER_TYPES = [
        ('pet_owner', 'Pet Owner'),
        ('merchant', 'Merchant'),
        ('veterinarian', 'Veterinarian'),
        ('delivery_agent', 'Delivery Agent'),
    ]
    user_type = models.CharField(max_length=20, choices=USER_TYPES)
    phone = models.CharField(max_length=15, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
