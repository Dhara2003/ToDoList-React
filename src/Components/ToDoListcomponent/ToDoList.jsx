import React, { useState, useEffect } from "react";
import "./ToDoList.css";

const ToDoList = () => {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskInput.trim()) return;
    const newTask = { id: Date.now().toString(), text: taskInput, status: "To Do" }; // Default status is "To Do"
    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const changeStatus = (task) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return {
          ...t,
          status:
            t.status === "To Do" ? "In Process" : 
            t.status === "In Process" ? "Completed" : "To Do", 
        };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (task) => {
    if (window.confirm(`Are you sure you want to delete "${task.text}"?`)) {
      setTasks(tasks.filter((t) => t.id !== task.id));
    }
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter((task) => task.status !== "Completed"));
  };

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <li key={task.id} className="task-item">
          {task.text}
          <button 
            className="move-btn" 
            onClick={() => changeStatus(task)}>
            {task.status === "To Do" ? "In Process" : task.status === "In Process" ? "Completed" : "To Do"}
          </button>
          <button className="delete-btn" onClick={() => deleteTask(task)}>
            Delete
          </button>
        </li>
      ));
  };

  return (
    <div className="todo-app">
      <h1>To-Do App</h1>
      <div className="input-section">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add Task</button>
        <button onClick={clearCompletedTasks}>Clear Completed</button>
      </div>
      <div className="task-sections">
        <div className="task-section">
          <h2>To Do</h2>
          <ul>{renderTasks("To Do")}</ul>
        </div>
        <div className="task-section">
          <h2>In Process</h2>
          <ul>{renderTasks("In Process")}</ul>
        </div>
        <div className="task-section">
          <h2>Completed</h2>
          <ul>{renderTasks("Completed")}</ul>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
