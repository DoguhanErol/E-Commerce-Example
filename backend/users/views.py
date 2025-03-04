from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer, UserSerializer, LoginSerializer, LogoutSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

# Kullanıcı Kaydı
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

# Kullanıcı Girişi
class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "username": user.username,
                "user_id": user.id,
            }
        )

# Kullanıcı Bilgisi
class UserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data)

class LogoutView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # 1. Access Token'i Al
        access_token = request.auth  # Kullanıcıdan gelen access token

        # 2. Refresh Token'i Al
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        refresh_token = serializer.validated_data["refresh"]

        # 3. Refresh Token'i Kara Listeye Ekle
        try:
            refresh = RefreshToken(refresh_token)
            refresh.blacklist()
        except Exception as e:
            return Response({"error": "Invalid refresh token"}, status=status.HTTP_400_BAD_REQUEST)

        # 4. Access Token'i Kara Listeye Ekle
        try:
            access = AccessToken(access_token)
            access.blacklist()  # Access token'i de blacklist'e ekliyoruz
        except Exception as e:
            pass  # Eğer hata olursa, bunu yoksayabiliriz (access token zorunlu değil)

        return Response({"message": "Logout successful"}, status=status.HTTP_204_NO_CONTENT)