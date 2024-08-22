import "./App.css"; // Add this line at the top
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { Task } from "./types";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [nextId, setNextId] = useState(0);

  const addTask = (name: string) => {
    setTasks([...tasks, { id: nextId, name }]);
    setNextId(nextId + 1);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const renameTask = (id: number, name: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, name } : task)));
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div>
        <h1 className="text-center my-4">Todo List</h1>
        <TaskInput addTask={addTask} />
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          renameTask={renameTask}
        />
      </div>
    </div>
  );
};

export default App;
