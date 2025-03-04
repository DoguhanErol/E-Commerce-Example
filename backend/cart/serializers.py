from rest_framework import serializers
from .models import Cart, CartItem, Product  # Product modelinizi de içe aktarın

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'color', 'size', 'category', 'image', 'updated_at']

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)  # Product bilgilerini serileştir

    class Meta:
        model = CartItem
        fields = ['product', 'quantity', 'color', 'size', 'added_at']  # İstediğiniz alanları ekleyin

class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True, read_only=True, source='items')  # 'items' alanını 'cart_items' olarak değiştirin

    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'updated_at', 'total_amount', 'cart_items']  # 'total_amount' ekleyin

