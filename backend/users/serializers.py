from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = User.objects.filter(username=data["username"]).first()
        if user and user.check_password(data["password"]):
            return user
        raise serializers.ValidationError("Invalid credentials")

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs["refresh"]
        try:
            RefreshToken(self.token)
        except Exception as e:
            raise serializers.ValidationError("Invalid refresh token")

        return attrs

    def save(self, **kwargs):
        try:
            refresh = RefreshToken(self.token)
            refresh.blacklist()  # Refresh token'i blacklist'e ekliyoruz
        except Exception as e:
            raise serializers.ValidationError("Invalid refresh token")

