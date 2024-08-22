import React from "react";
import { Task } from "../types";

interface Props {
  tasks: Task[];
  deleteTask: (id: number) => void;
  renameTask: (id: number, name: string) => void;
}

const TaskList: React.FC<Props> = ({ tasks, deleteTask, renameTask }) => {
  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <input
            type="text"
            defaultValue={task.name}
            onBlur={(e) => renameTask(task.id, e.target.value)}
          />
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
