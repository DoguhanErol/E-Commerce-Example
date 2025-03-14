import axios from "axios";
import {
  API_URL_REGISTER,
  API_URL_LOGIN,
  API_URL_LOGOUT,
  API_URL_USER,
  API_URL_REFRESH,
} from "../config/authConfig";
import AuthHeader from "./AuthHeader";

export const authService = {
  // Kullanıcı kaydı
  register: async (userData: { username: string; password: string; email: string }) => {
    return await axios.post(API_URL_REGISTER, userData);
  },

  // Kullanıcı girişi
  login: async (username: string, password: string) => {
    const response = await axios.post(API_URL_LOGIN, { username, password });
    return response.data; // Token'ı useAuth içinde localStorage'a kaydedeceğiz
  },

  // Kullanıcı çıkışı
  logout: async () => {
    const response = await axios.post(API_URL_LOGOUT, {}, { headers: AuthHeader() });
    return response;
  },

  // Kullanıcı bilgilerini al
  getUser: async () => {
    return await axios.get(API_URL_USER, { headers: AuthHeader() });
  },

  // Token yenileme
  refreshToken: async () => {
    const response = await axios.post(API_URL_REFRESH);
    return response.data; // Yeni token'ı useAuth içinde saklayacağız
  },
};
