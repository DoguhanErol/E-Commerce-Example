
import axios from "axios";
import { API_URL_CART } from "../config/authConfig";
import { ProductForCart } from "../models/Product";
import AuthHeader from "./AuthHeader";

export const getCart = async () => {
    try {
      const response = await axios.get<any>(API_URL_CART+'list/',{ headers: AuthHeader() });
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  export const postItemToCart = async (product:ProductForCart) => {
    try {
      const response = await axios.post<boolean>(API_URL_CART +'add/', product,{ headers: AuthHeader() });
      return response.data;
    } catch (error) {
      throw error; 
    }
  };