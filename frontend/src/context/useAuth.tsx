import { useState, useEffect, useCallback } from "react";
import { authService } from "../services/AuthService";
import { User } from "../models/User"; // User tipi

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  isLoggedIn: () => boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isLoggedIn = () => !!user;

  const loadUser = async () => {
    try {
      const response = await authService.getUser();
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error: any) {
      setError("Failed to load user");
    }
  };

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await authService.login(username, password);
      if (response.accessToken) {
        localStorage.setItem("user", JSON.stringify(response));
        setUser(response);
      }
      setLoading(false);
      return true;
    } catch (error: any) {
      setError(error.response?.data?.detail || "Login failed, please try again");
      setLoading(false);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
      const response = await authService.register({ username, email, password });
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setLoading(false);
    } catch (error: any) {
      setError(error.response?.data?.detail || "Registration failed, please try again");
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      localStorage.removeItem("user");
    } catch (error: any) {
      setError(error.response?.data?.detail || "Logout failed, please try again");
    }
  };

  const refreshToken = useCallback(async () => {
    try {
      const response = await authService.refreshToken();
      localStorage.setItem("user", JSON.stringify(response));
      setUser(response);
    } catch (error: any) {
      setError("Failed to refresh token");
      logout();
    }
  }, [logout]);

  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, []);

  return { user, login, register, logout, error, refreshToken, isLoggedIn };
};
