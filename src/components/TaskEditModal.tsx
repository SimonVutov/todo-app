import React, { useState, useEffect } from "react";
import { Task } from "../types";

interface TaskEditModalProps {
  task: Task | null;
  show: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({
  task,
  show,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(task?.name || "");
  const [priority, setPriority] = useState<"low" | "medium" | "high">(
    task?.priority || "medium"
  );
  const [dueDate, setDueDate] = useState<string>(() => {
    return task?.dueDate
      ? task.dueDate.toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0];
  });

  useEffect(() => {
    if (task) {
      setName(task.name);
      setPriority(task.priority);
      setDueDate(
        task.dueDate
          ? task.dueDate.toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0]
      );
    }
  }, [task]);

  const handleSave = () => {
    if (task) {
      const updatedTask: Task = {
        ...task,
        name,
        priority,
        dueDate: new Date(dueDate),
      };
      onSave(updatedTask);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Task</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Task Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "low" | "medium" | "high")
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskEditModal;
