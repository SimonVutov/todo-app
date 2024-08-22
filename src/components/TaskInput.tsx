import React, { useState } from "react";
//import { Task } from "../types";
//comment

interface Props {
  addTask: (name: string) => void;
}

const TaskInput: React.FC<Props> = ({ addTask }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() !== "") {
      addTask(input);
      setInput("");
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
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default TaskInput;
