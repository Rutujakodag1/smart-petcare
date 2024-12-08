from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    age = serializers.IntegerField(required=False, allow_null=True)
    pet_breed = serializers.CharField(required=False, allow_blank=True)
    pet_name = serializers.CharField(required=False, allow_blank=True)
    pet_favorite_food = serializers.CharField(required=False, allow_blank=True)
    class Meta:
        model=User
        fields = ['id', 'username','email',"password",'pet_name', 'pet_breed', 'pet_age', 'pet_favorite_food']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','password']


