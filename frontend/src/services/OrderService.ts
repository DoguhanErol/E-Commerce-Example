import axios from "axios";
import { Order } from "../models/Order";
import { API_URL_ORDER_CREATE, API_URL_ORDER_DETAIL, API_URL_ORDER_LIST } from "../config/authConfig";
import AuthHeader from "./AuthHeader";

type ServerMessage = {
    message:string
}

export const getAllOrders = async (): Promise<Order[]> => {
    try {
        const response = await axios.get<Order[]>(`${API_URL_ORDER_LIST}`,{ headers: AuthHeader() })
        console.log('In Service:', response);
        return response.data;
    } catch (error) {
        console.log('Error fetching orders:', error);
        throw error
    }

};

export const getOrderDetailById = async (orderId:string):Promise<Order[]> => {
    try {
        const response = await axios.get<Order[]>(`${API_URL_ORDER_DETAIL} ${orderId}`,{ headers: AuthHeader() })
        console.log('In Service:', response);
        return response.data;
    } catch (error) {
        console.log('Error fetching orders:', error);
        throw error
    }
};

export const createOrder = async ():Promise<ServerMessage> => {
    try {
        const response = await axios.post<ServerMessage>(`${API_URL_ORDER_CREATE}`,{ headers: AuthHeader() })
        const message:ServerMessage = response.data
        return message
    } catch (error) {
        console.log('Error create a order:', error);
        throw error
    }

};


  