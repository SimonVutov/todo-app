import React, { useState } from "react";

interface Props {
  addTask: (
    name: string,
    priority: "low" | "medium" | "high",
    dueDate: Date
  ) => void;
}

const TaskInput: React.FC<Props> = ({ addTask }) => {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState<string>(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });

  const handleAdd = () => {
    if (input.trim() !== "") {
      const dateParts = dueDate.split("-");
      const dateObject = new Date(
        Number(dateParts[0]),
        Number(dateParts[1]) - 1,
        Number(dateParts[2]),
        12
      ); // Set time to noon to avoid timezone issues
      addTask(input, priority, dateObject);
      setInput("");
      setPriority("medium");
      setDueDate(new Date().toISOString().split("T")[0]); // Reset to today
    }
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Add new task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
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
      <input
        type="date"
        className="form-control"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button
        className="btn btn-outline-dark"
        type="button"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default TaskInput;
