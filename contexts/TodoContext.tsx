"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";
import axios from "axios";
import { useAuth } from "./AuthAndProfileContext";

export type Todo = {
  id: number;
  position: number;
  title: string;
  description: string;
  priority: "extreme" | "moderate" | "low";
  is_completed: boolean;
  todo_date: string;
};

export type TodoResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Todo[];
};

interface TodoContextType {
  todos: TodoResponse | null;
  loading: boolean;
  error: string | null;
  getTodos: () => Promise<void>;
  createTodo: (data: Partial<Todo>) => Promise<void>;
  updateTodo: (id: number, data: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  updateTodoPosition: (id: number, position: number) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<TodoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API = process.env.NEXT_PUBLIC_API;

 const axiosInstance = useMemo(() => {
  const instance = axios.create({ baseURL: API });
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  return instance;
}, [API]);


  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const handleRequest = useCallback(
    async <T, >(apiCall: () => Promise<T>): Promise<T> => {
      setLoading(true);
      setError(null);
      try {
        return await apiCall();
      } catch (err) {
        let msg = "Something went wrong";
        if (axios.isAxiosError(err)) {
          msg = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
          msg = err.message;
        }
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getTodos = useCallback(async (): Promise<void> => {
    if (!user) return;
    const res = await handleRequest(() => axiosInstance.get<TodoResponse>("/api/todos/"));
    setTodos(res.data);
  }, [user, handleRequest, axiosInstance]);

  const createTodo = async (data: Partial<Todo>): Promise<void> => {
    if (data.priority) data.priority = data.priority.toLowerCase() as Todo["priority"];
    await handleRequest(() => axiosInstance.post("/api/todos/", data));
    await getTodos();
  };

  const updateTodo = async (id: number, data: Partial<Todo>): Promise<void> => {
    if (data.priority) data.priority = data.priority.toLowerCase() as Todo["priority"];
    setTodos(prev => prev ? { ...prev, results: prev.results.map(t => t.id === id ? { ...t, ...data } : t) } : null);
    await handleRequest(() => axiosInstance.put(`/api/todos/${id}/`, data));
  };

  const deleteTodo = async (id: number): Promise<void> => {
    await handleRequest(() => axiosInstance.delete(`/api/todos/${id}/`));
    await getTodos();
  };

  const updateTodoPosition = async (id: number, position: number): Promise<void> => {
    const updatedTodo = await handleRequest<Todo>(() => axiosInstance.patch(`/api/todos/${id}/`, { position }));
    setTodos(prev => prev ? { ...prev, results: prev.results.map(t => t.id === id ? updatedTodo : t) } : null);
  };

  useEffect(() => {
  if (user) void getTodos();
}, [user, getTodos]);

  return (
    <TodoContext.Provider value={{ todos, loading, error, getTodos, createTodo, updateTodo, deleteTodo, updateTodoPosition }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within TodoProvider");
  return context;
};
