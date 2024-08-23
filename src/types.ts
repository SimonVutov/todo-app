// src/types.ts
export interface Task {
  id: number;
  name: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: Date; // Optional due date
}