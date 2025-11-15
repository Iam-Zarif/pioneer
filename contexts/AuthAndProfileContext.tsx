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
  profile_image?: File;
  [key: string]: any;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/";
}

function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .reduce((r, v) => {
      const parts = v.split("=");
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, "");
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API = process.env.NEXT_PUBLIC_API;

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: API,
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = getCookie("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
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
    const res = await handleRequest(() =>
      axios.post(`${API}/api/users/signup/`, data)
    );
    await getProfile();
  };

const login = async (data: LoginData) => {
  const res = await handleRequest(() =>
    axios.post(`${API}/api/auth/login/`, data)
  );
  const token = res.data.access;
  localStorage.setItem("access_token", token);
  console.log("Login token set in localStorage:", token);
  await getProfile();
};

const getProfile = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const res = await axiosInstance.get("/api/users/me/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Fetched user profile:", res.data);
    setUser(res.data);
  } catch (err) {
    console.error("Error fetching profile:", err);
    setUser(null);
  } finally {
    setLoading(false);
  }
};

const updateProfile = async (data: UpdateProfileData) => {
  setLoading(true);
  setError(null);

  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("No access token found");
      return;
    }

 let formData = new FormData();
Object.entries(data).forEach(([key, value]) => {
  if (value !== undefined && key !== "profile_image") {
    formData.append(key, value);
  }
});

if (data.profile_image instanceof File) {
  formData.append("profile_image", data.profile_image); // key name must match backend
}


    const res = await axiosInstance.put("/api/users/me/", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Updated profile:", res.data);
    setUser(res.data);

  } catch (err: any) {
    const msg = err.response?.data?.message || err.message || "Something went wrong";
    setError(msg);
    console.error("Update profile error:", msg);

  } finally {
    setLoading(false);
  }
};



  const logout = () => {
    document.cookie = "access_token=; max-age=0; path=/";
    setUser(null);
    console.log("Logged out");
  };

  useEffect(() => {
    getProfile().catch(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signup,
        login,
        logout,
        getProfile,
        updateProfile,
      }}
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
