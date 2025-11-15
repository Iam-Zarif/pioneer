"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios, { AxiosInstance } from "axios";

interface User {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signup: (data: SignupData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  getProfile: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
}

interface SignupData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UpdateProfileData {
  first_name?: string;
  last_name?: string;
  email?: string;
  [key: string]: any;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const API = process.env.NEXT_PUBLIC_API;

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: API,
  });

  axiosInstance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const handleRequest = async (apiCall: () => Promise<any>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiCall();
      return res;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Something went wrong";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    const res = await handleRequest(() => axios.post(`${API}/api/users/signup/`, data));
    setToken(res.data.access_token);
    setUser(res.data.user);
  };

  const login = async (data: LoginData) => {
    const res = await handleRequest(() => axios.post(`${API}/api/auth/login/`, data));
    setToken(res.data.access_token);
    setUser(res.data.user);
  };
  const getProfile = async () => {
    if (!token) return;
    const res = await handleRequest(() => axiosInstance.get("/user/profile"));
    setUser(res.data);
  };

  const updateProfile = async (data: UpdateProfileData) => {
    if (!token) return;
    const res = await handleRequest(() => axiosInstance.put("/user/profile", data));
    setUser(res.data);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    if (token) getProfile();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, loading, error, signup, login, logout, getProfile, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
