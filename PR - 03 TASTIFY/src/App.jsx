import React, { useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  const taskRef = useRef(null);
  const priorityRef = useRef(null);

  const handleAddOrUpdateTask = (e) => {
    e.preventDefault();
    const name = taskRef.current.value.trim();
    const priority = priorityRef.current.value;

    if (!name || !priority) return alert("Please fill all fields!");

    if (editMode) {
      setTasks(
        tasks.map((t) => (t.id === editId ? { ...t, name, priority } : t)),
      );
      setEditMode(false);
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), name, priority }]);
    }

    taskRef.current.value = "";
    priorityRef.current.value = "";
  };

  const handleDelete = (id) => setTasks(tasks.filter((t) => t.id !== id));
  const handleEdit = (task) => {
    taskRef.current.value = task.name;
    priorityRef.current.value = task.priority;
    setEditMode(true);
    setEditId(task.id);
  };

  const displayedTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.priority === filter);
  const getPriorityLabel = (p) =>
    p === "1" ? "High" : p === "2" ? "Medium" : "Low";
  const getPriorityColor = (p) =>
    p === "1" ? "high" : p === "2" ? "medium" : "low";

  return (
    <div className="app-container">
      <h1 className="app-title">Plan, Track and Achieve</h1>
      <div className="main-layout">
        <div className="left-side">
          <form onSubmit={handleAddOrUpdateTask} className="task-form">
            <input type="text" placeholder="Enter Task..." ref={taskRef} />
            <select ref={priorityRef}>
              <option value="">Select Priority</option>
              <option value="1">High</option>
              <option value="2">Medium</option>
              <option value="3">Low</option>
            </select>
            <button type="submit">{editMode ? "Update" : "Add"}</button>
          </form>
          <div className="filter-container">
            <select onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Tasks</option>
              <option value="1">High Priority</option>
              <option value="2">Medium Priority</option>
              <option value="3">Low Priority</option>
            </select>
          </div>
        </div>
        <div className="right-side">
          {displayedTasks.length === 0 ? (
            <p className="no-tasks">No tasks yet</p>
          ) : (
            displayedTasks.map((task) => (
              <div
                className={`task-card ${getPriorityColor(task.priority)}`}
                key={task.id}
              >
                <span className="task-name">{task.name}</span>
                <span className="task-priority">
                  {getPriorityLabel(task.priority)}
                </span>
                <div className="task-actions">
                  <button onClick={() => handleEdit(task)} className="edit-btn">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
