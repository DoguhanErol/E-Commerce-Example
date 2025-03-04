from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from products.models import Product
from django.shortcuts import get_object_or_404

# class CartView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, *args, **kwargs):
#         if not request.user.is_authenticated:
#             return Response({"error": "Yetkisiz erişim."}, status=status.HTTP_401_UNAUTHORIZED)

#         try:
#             cart = Cart.objects.get(user=request.user)
#             cart_items = CartItem.objects.filter(cart=cart)
#             serializer = CartItemSerializer(cart_items, many=True)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         except Cart.DoesNotExist:
#             return Response({"message": "Sepet bulunamadı."}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            cart = Cart.objects.get(user=request.user)
            cart_serializer = CartSerializer(cart)  # Sadece cart'ı serileştir
            return Response(cart_serializer.data, status=status.HTTP_200_OK)

        except Cart.DoesNotExist:
            return Response({"message": "Sepet bulunamadı."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"error": "Yetkisiz erişim."}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            cart, created = Cart.objects.get_or_create(user=request.user)
            product_id = request.data.get('product_id')
            quantity = request.data.get('quantity', 1)

            product = get_object_or_404(Product, id=product_id)
            cart_item, created = CartItem.objects.get_or_create(
                cart=cart,
                product=product,
                color=request.data.get('color'),
                size=request.data.get('size'),
            )
            if not created:
                cart_item.quantity += quantity
            else:
                cart_item.quantity = quantity
            cart_item.save()

            # Toplam tutarı güncelle
            cart.calculate_total()

            return Response({True}, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({False}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CartRemoveView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"error": "Yetkisiz erişim."}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            product_id = request.data.get('product_id')
            quantity = request.data.get('quantity', 1)

            cart = Cart.objects.get(user=request.user)
            cart_item = CartItem.objects.get(cart=cart, product_id=product_id)

            if cart_item.quantity > quantity:
                cart_item.quantity -= quantity
                cart_item.save()
            elif cart_item.quantity == quantity:
                cart_item.delete()
            else:
                return Response({"error": "Belirtilen miktar sepette mevcut değil."}, status=status.HTTP_400_BAD_REQUEST)

            # Toplam tutarı güncelle
            cart.calculate_total()

            return Response({"message": "Ürün miktarı azaltıldı."}, status=status.HTTP_200_OK)
        
        except Cart.DoesNotExist:
            return Response({"error": "Sepet bulunamadı."}, status=status.HTTP_404_NOT_FOUND)
        except CartItem.DoesNotExist:
            return Response({"error": "Ürün sepette bulunamadı."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CartClearView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"error": "Yetkisiz erişim."}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            cart = Cart.objects.get(user=request.user)
            # Sepetteki tüm ürünleri temizle
            CartItem.objects.filter(cart=cart).delete()
            # Toplam tutarı sıfırla
            cart.total_amount = 0  # Toplam tutarı sıfırla
            cart.save()  # Değişiklikleri kaydet
            return Response({"message": "Sepet temizlendi."}, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({"error": "Sepet bulunamadı."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

