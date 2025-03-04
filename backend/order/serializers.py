from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()  # Product bilgilerini dahil et

    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'product', 'color', 'size', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    totalAmount = serializers.DecimalField(source='total_amount', max_digits=10, decimal_places=2)

    class Meta:
        model = Order
        fields = ['id', 'created_at', 'updated_at', 'status', 'totalAmount', 'items']

