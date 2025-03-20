 import axios from "axios";
 import {
   API_URL_REGISTER,
   API_URL_LOGIN,
   API_URL_LOGOUT,
   API_URL_USER,
   API_URL_REFRESH,
 } from "../config/authConfig";
 import AuthHeader from "./AuthHeader";
import { User } from "../models/User";
import { useState } from "react";
import { useAuthStatus } from "../context/AuthContext";


 export const authService = {
   // Kullanıcı kaydı
   register: async (userData: { username: string; password: string; email: string }) => {
    try {
      const response = await axios.post(API_URL_REGISTER, userData);
      if (response.data) {
        return true;
      }else{
        return false;
      }
    } catch (error) {
      console.log(error)
      return false;
    }
   },
   

   // Kullanıcı girişi
   login: async (username: string, password: string) => {
     const response = await axios.post(API_URL_LOGIN, { username, password });
     if (response.status === 200 || response.status === 204 ) {
     localStorage.setItem("user", JSON.stringify(response.data.user));
     localStorage.setItem("accessToken", response.data.accessToken);
     localStorage.setItem("refreshToken", response.data.refreshToken);
     console.log('LoginService successed.')
     return true;
     }else {
      console.error("Login error statuss:", response.status);
      return false;
    }
   },

   // Kullanıcı çıkışı
   logout: async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    console.log(refreshToken)
     try {
     const response= await axios.post(
        API_URL_LOGOUT,
        { refreshToken: refreshToken },
        { headers: AuthHeader() } //Auth header gerekli sekilde bearer token olarak accessTokeni gonderiyor
    );
    if (response.status === 200 || response.status === 204) {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } else {
      console.error("Logout request succeeded but returned unexpected status:", response.status);
    }
  } catch (error) {
       console.error("Logout request failed:", error);
     }
   },

   // Kullanıcı bilgilerini al
   getUser: async () => {
    const response = await axios.get(API_URL_USER, { headers: AuthHeader() });
    const activeUser: User = response.data;
    return activeUser;
   },

   // Token yenileme
   refreshToken: async () => {
     const storedRefreshToken = localStorage.getItem('refreshToken')
     if (!storedRefreshToken) return null;
     try {
       const response = await axios.post(API_URL_REFRESH, { refresh: storedRefreshToken });
       if (response.status === 200 || response.status === 204) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.setItem('accessToken',response.data.access);
        localStorage.setItem('refreshToken',response.data.refresh);
        return true
      } else {
        console.error("Refresh token error.:", response.status);
        return false
      }
     } catch (error) {
       console.error("Failed to refresh token:", error);
       return false;
     }
   },





//localstorage thinks

// //   // LocalStorage işlemleri
// //   setUserToStorage: (user: any) => {
// //     localStorage.setItem("user", JSON.stringify(user));
// //   },

// //   getUserFromStorage: () => {
// //     const user = localStorage.getItem("user");
// //     return user ? JSON.parse(user) : null;
// //   },

// //   setTokens: (accessToken: string, refreshToken: string) => {
// //     localStorage.setItem("accessToken", accessToken);
// //     localStorage.setItem("refreshToken", refreshToken);
// //   },

// //   getAccessToken: () => {
// //     return localStorage.getItem("accessToken");
// //   },

// //   getRefreshToken: () => {
// //     return localStorage.getItem("refreshToken");
// //   },

// //   isAuthenticated: () => {
// //     return !!authService.getAccessToken();
// //   },

// //   clearStorage: () => {
// //     localStorage.removeItem("user");
// //     localStorage.removeItem("accessToken");
// //     localStorage.removeItem("refreshToken");
// //   },
};
