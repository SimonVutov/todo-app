import React from "react";
import { Task } from "../types";

interface Props {
  tasks: Task[];
  deleteTask: (id: number) => void;
  toggleTaskCompletion: (id: number) => void;
  onEditTask: (task: Task) => void;
}

const TaskList: React.FC<Props> = ({
  tasks,
  deleteTask,
  toggleTaskCompletion,
  onEditTask,
}) => {
  const getPriorityBadgeClass = (priority: "low" | "medium" | "high") => {
    if (priority === "high") return "badge bg-danger";
    if (priority === "medium") return "badge bg-warning text-dark";
    return "badge bg-secondary";
  };

  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              className="me-2"
            />
            <div>
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.name}
              </span>
              <div>
                <small className={getPriorityBadgeClass(task.priority)}>
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}{" "}
                  Priority
                </small>
                {task.dueDate && (
                  <small className="ms-2">
                    | Due: {task.dueDate.toDateString()}
                  </small>
                )}
              </div>
            </div>
          </div>
          <div>
            <button
              className="btn btn-light btn-sm me-2"
              onClick={() => onEditTask(task)} // Trigger the edit modal
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
