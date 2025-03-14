from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

# Kullanıcı bilgileri için Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")

# Kullanıcı Kaydı Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# Kullanıcı Giriş Serializer (Token Döndürüyor)
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        user = User.objects.filter(username=username).first()
        if not user:
            raise serializers.ValidationError("Geçersiz kullanıcı adı veya şifre.")

        if not user.check_password(password):
            raise serializers.ValidationError("Geçersiz kullanıcı adı veya şifre.")

        refresh = RefreshToken.for_user(user)
        return {
            "user": UserSerializer(user).data,
            "accessToken": str(refresh.access_token),
            "refreshToken": str(refresh),
        }

# Kullanıcı Çıkış Serializer
class LogoutSerializer(serializers.Serializer):
    refreshToken = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs["refreshToken"]
        try:
            RefreshToken(self.token)
        except Exception:
            raise serializers.ValidationError("Invalid refresh token")
        return attrs

    def save(self, **kwargs):
        try:
            refresh = RefreshToken(self.token)
            refresh.blacklist()  # Refresh token'ı kara listeye ekle
        except Exception:
            raise serializers.ValidationError("Invalid refresh token")
