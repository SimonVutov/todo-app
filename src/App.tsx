import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskEditModal from "./components/TaskEditModal";
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
  const [sortCriterion, setSortCriterion] = useState<
    "date" | "priority" | "completion"
  >("date");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const saveTaskEdits = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setShowEditModal(false);
    setSelectedTask(null);
  };

  // Combine filtering, sorting, and search logic
  const filteredSortedTasks = [...tasks]
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .filter((task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriterion === "date") {
        return a.dueDate && b.dueDate
          ? a.dueDate.getTime() - b.dueDate.getTime()
          : 0;
      } else if (sortCriterion === "priority") {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortCriterion === "completion") {
        return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
      }
      return 0;
    });

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <div className="text-center" style={{ maxWidth: "600px", width: "100%" }}>
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
        <div className="mb-3">
          <label>Sort By: </label>
          <select
            className="form-select form-select-sm mt-2"
            value={sortCriterion}
            onChange={(e) =>
              setSortCriterion(
                e.target.value as "date" | "priority" | "completion"
              )
            }
          >
            <option value="date">Due Date</option>
            <option value="priority">Priority</option>
            <option value="completion">Completion Status</option>
          </select>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <TaskList
          tasks={filteredSortedTasks} // Pass the sorted and filtered tasks
          deleteTask={deleteTask}
          toggleTaskCompletion={toggleTaskCompletion}
          onEditTask={handleEditTask}
        />
        <button
          className="btn btn-outline-danger btn-sm mt-3"
          onClick={clearCompletedTasks}
        >
          Clear Completed Tasks
        </button>
        <TaskEditModal
          task={selectedTask}
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={saveTaskEdits}
        />
      </div>
    </div>
  );
};

export default App;
