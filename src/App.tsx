import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { Task } from "./types";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks: Task[] = JSON.parse(storedTasks);
      return parsedTasks.map((task) => ({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      }));
    }
    return [];
  });

  const [nextId, setNextId] = useState(
    tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 0
  );
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (
    name: string,
    priority: "low" | "medium" | "high",
    dueDate: Date
  ) => {
    setTasks([
      ...tasks,
      { id: nextId, name, completed: false, priority, dueDate },
    ]);
    setNextId(nextId + 1);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const renameTask = (id: number, name: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, name } : task)));
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div
      className="d-flex justify-content-center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <div className="text-center" style={{ maxWidth: "480px", width: "100%" }}>
        <h1 className="my-4">Todo List</h1>
        <TaskInput addTask={addTask} />
        <div className="mb-3">
          <button
            className={`btn btn-sm ${
              filter === "all" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`btn btn-sm ms-2 ${
              filter === "active" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`btn btn-sm ms-2 ${
              filter === "completed" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          renameTask={renameTask}
          toggleTaskCompletion={toggleTaskCompletion}
        />
        <button
          className="btn btn-danger btn-sm mt-3"
          onClick={clearCompletedTasks}
        >
          Clear Completed Tasks
        </button>
      </div>
    </div>
  );
};

export default App;
