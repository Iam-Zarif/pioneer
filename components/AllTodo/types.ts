// src/types.ts
export interface Todo {
  id?: number;                 
  title: string;
  description: string;
  priority: "extreme" | "moderate" | "low";
  is_completed: boolean;
  todo_date: string;
  position?: number;            
  created_at?: string;
  updated_at?: string;
}
