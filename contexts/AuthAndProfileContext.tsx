"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import axios from "axios";

interface User {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  [key: string]: unknown;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signup: (data: SignupData) => Promise<void>;
  login: (data: LoginData) => Promise<User>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // <-- added
  getProfile: () => Promise<User | null>;
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
  [key: string]: unknown;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expires +
    "; path=/";
}

function getCookie(name: string) {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API = process.env.NEXT_PUBLIC_API;

  const api = useCallback(
    () =>
      axios.create({
        baseURL: API,
        headers: {
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      }),
    [API]
  );

  const getProfile = useCallback(async (): Promise<User | null> => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return null;
    }

    try {
      const res = await api().get("/api/users/me/");
      setUser(res.data);
      return res.data;
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "An unknown error occurred";
      setError(msg);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [api]);

const signup = async (data: SignupData) => {
  try {
    await axios.post(`${API}/api/users/signup/`, data);

    await login({ email: data.email, password: data.password });
    
  } catch (err: unknown) {
    const msg =
      err instanceof Error
        ? err.message
        : typeof err === "string"
        ? err
        : "An unknown error occurred";
    setError(msg);
    throw new Error(msg); 
  }
};


  const login = async (data: LoginData): Promise<User> => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${API}/api/auth/login/`, data);
      const token = res.data.access;
      localStorage.setItem("access_token", token);
      setCookie("access_token", token);

      const profile = await getProfile(); // use getProfile here
      return profile!;
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "An unknown error occurred";
      setError(msg);
      throw new Error(msg); // for signup
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

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          const val: string | Blob =
            value instanceof File ? value : String(value);
          formData.append(key, val);
        }
      });

      const res = await api().put("/api/users/me/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser((prev) => ({ ...prev, ...res.data }));
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "An unknown error occurred";
      setError(msg);
      throw new Error(msg); // for signup
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setCookie("access_token", "", -1);
    setUser(null);
  };

  useEffect(() => {
    getProfile().catch(() => setLoading(false));
  }, [getProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signup,
        login,
        setUser,
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
