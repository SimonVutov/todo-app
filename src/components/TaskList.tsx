// TaskList.tsx
import React from "react";
import { Task } from "../types";

interface Props {
  tasks: Task[];
  deleteTask: (id: number) => void;
  renameTask: (id: number, name: string) => void;
  toggleTaskCompletion: (id: number) => void;
}

const TaskList: React.FC<Props> = ({
  tasks,
  deleteTask,
  renameTask,
  toggleTaskCompletion,
}) => {
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
              <input
                type="text"
                defaultValue={task.name}
                onBlur={(e) => renameTask(task.id, e.target.value)}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              />
              <div>
                <small>
                  Priority: {task.priority}{" "}
                  {task.dueDate && `| Due: ${task.dueDate.toDateString()}`}
                </small>
              </div>
            </div>
          </div>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
