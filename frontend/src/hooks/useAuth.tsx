import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService } from "../services/AuthService";
import { User } from "../models/User";

interface AuthContextProps {
  user: User | null;
  isLoggedIn: boolean;
  loadingAuth: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const loadUser = async () => {
    try {
      const response = await authService.getUser();
      setUser(response);
      setIsLoggedIn(true);
    } catch (error: any) {
      setError("Failed to load user");
      setIsLoggedIn(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoadingAuth(true);
    try {
      const response = await authService.login(username, password);
      if (response) {
        await loadUser();
        console.log("Login auth başarılı");
        await refreshToken();
        setIsLoggedIn(true);
        setLoadingAuth(false);
        return true;
      } else {
        setLoadingAuth(false);
        return false;
      }
    } catch (error: any) {
      setError(error || "Login failed, please try again");
      setLoadingAuth(false);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setLoadingAuth(true);
    try {
      const response = await authService.register({ username, email, password });
      if (response) {
        console.log("Registration complete, Message from AuthProvider");
      }
      setLoadingAuth(false);
    } catch (error: any) {
      setError(error.response?.data?.detail || "Registration failed, please try again");
      setLoadingAuth(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setIsLoggedIn(false);
      setUser(null);
    } catch (error: any) {
      console.error("Logout request failed:", error);
    }
  };

  const refreshToken = async () => {
    try {
      const isRefreshed = await authService.refreshToken();
      if (isRefreshed) {
        console.log("Token refreshed.");
      }
    } catch (error: any) {
      console.log("Token can't be refreshed.");
      setError("Failed to refresh token");
    }
  };

  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        loadingAuth,
        error,
        login,
        register,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
