import { useCallback, useEffect, useState } from "react";
import { Order } from "../models/Order";
import { getAllOrders } from "../services/OrderService";

export const useFetchOrders = () => {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleFetchOrders = useCallback(async () => {
        setOrders(null);
        setIsLoading(true);
        try {
          const data = await getAllOrders();
          setOrders(data || null);
        } catch (error) {
          setError('Failed to fetch user profile information');
        } finally {
          setIsLoading(false);
        }
      },[]);

    useEffect(() => {
      handleFetchOrders();
    }, [handleFetchOrders])
    

    return { orders, isLoading, error,refetch:handleFetchOrders };
}