import axios from "axios";
import { Order } from "../models/Order";
import { API_URL_ORDER_CREATE, API_URL_ORDER_DETAIL, API_URL_ORDER_LIST } from "../config/authConfig";
import AuthHeader from "./AuthHeader";


export const getAllOrders = async (): Promise<Order[]> => {
    try {
        const response = await axios.get<Order[]>(API_URL_ORDER_LIST,{ headers: AuthHeader() })
        return response.data;
    } catch (error) {
        throw error
    }

};

export const getOrderDetailById = async (orderId:string):Promise<Order[]> => {
    try {
        const response = await axios.get<Order[]>(API_URL_ORDER_DETAIL + orderId,{ headers: AuthHeader() })
        return response.data;
    } catch (error) {
        throw error
    }
};

export const createOrder = async () => {
    try {
        const response = await axios.post(API_URL_ORDER_CREATE,{},{ headers: { ...AuthHeader(), 'Content-Type': 'application/json' } })
        const message = response.data
        return message
    } catch (error) {
        throw error
    }

};


  