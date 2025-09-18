import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all");
  const [isDemoMode, setIsDemoMode] = useState(false);

  // ✅ Fetch todos from backend
  const BASE_URL = import.meta.env.VITE_API_URL;

  // Demo data for when backend is not available
  const demoTodos = [
    { _id: "demo-1", task: "Welcome to the Todo App! 🎉", status: "pending" },
    { _id: "demo-2", task: "This is demo mode (backend not connected)", status: "pending" },
    { _id: "demo-3", task: "Add, edit, and delete todos", status: "done" },
    { _id: "demo-4", task: "Filter between All/Pending/Done", status: "done" }
  ];


  const fetchTodos = async () => {
    try {
      // Check if we're in production and no API URL is set, or if API URL is localhost
      if (!BASE_URL || BASE_URL.includes('localhost')) {
        console.log("No backend API available, switching to demo mode");
        setIsDemoMode(true);
        setTodos(demoTodos);
        setError("Demo Mode: Backend API not connected. Deploy backend to see full functionality.");
        return;
      }

      const res = await fetch(`${BASE_URL}/todos`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      setTodos(data);
      setIsDemoMode(false);
      setError(null);
    } catch (err) {
      console.log("API connection failed, switching to demo mode");
      setIsDemoMode(true);
      setTodos(demoTodos);
      setError("Demo Mode: Cannot connect to backend API. " + err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ✅ Add new todo
  const addTodo = async () => {
    if (!newTask.trim()) return;

    if (isDemoMode) {
      // Demo mode: add todo locally
      const newTodo = {
        _id: `demo-${Date.now()}`,
        task: newTask,
        status: "pending"
      };
      setTodos([...todos, newTodo]);
      setNewTask("");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newTask, status: "pending" }),
      });

      if (!res.ok) throw new Error("Failed to add task");

      const data = await res.json();
      setTodos([...todos, data]);
      setNewTask("");
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Delete todo
  const deleteTodo = async (id) => {
    if (isDemoMode) {
      // Demo mode: delete locally
      setTodos(todos.filter((t) => t._id !== id));
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete task");

      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Start editing
  const startEditing = (id, currentTask) => {
    setEditingId(id);
    setEditingText(currentTask);
  };

  // ✅ Save edited todo
  const saveEdit = async (id) => {
    if (isDemoMode) {
      // Demo mode: edit locally
      setTodos(todos.map((t) => (t._id === id ? { ...t, task: editingText } : t)));
      setEditingId(null);
      setEditingText("");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: editingText }),
      });

      if (!res.ok) throw new Error("Failed to update task");

      const updated = await res.json();
      setTodos(todos.map((t) => (t._id === id ? updated : t)));
      setEditingId(null);
      setEditingText("");
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Update status (done/pending)
  const updateStatus = async (id, status) => {
    if (isDemoMode) {
      // Demo mode: update status locally
      setTodos(todos.map((t) => (t._id === id ? { ...t, status } : t)));
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      const updated = await res.json();
      setTodos(todos.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Filtered todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    return todo.status === filter;
  });

  // ✅ Change background color if URL contains color=purple
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("color") === "purple") {
      document.body.style.backgroundColor = "purple";
    } else {
      document.body.style.backgroundColor = "";
    }
  }, []);

  return (
    <div className="App">
      <h1>✅ TODO {isDemoMode && <span style={{ fontSize: '0.6em', color: '#666' }}>(Demo Mode)</span>}</h1>

      {error && <p style={{ color: isDemoMode ? "orange" : "red" }}>
        {isDemoMode ? "ℹ️ " : "❌ "}{error}
      </p>}

      {isDemoMode && (
        <div style={{ 
          background: '#f0f8ff', 
          padding: '10px', 
          margin: '10px 0', 
          borderRadius: '5px',
          border: '1px solid #007bff'
        }}>
          <strong>🚀 Demo Mode Active!</strong>
          <p style={{ margin: '5px 0' }}>
            You're seeing a working demo. Changes are saved locally and will reset on page refresh.
            <br />
            <a href="https://github.com/dhanashri-salunkhe25/todos" target="_blank" rel="noopener noreferrer">
              Deploy your own backend
            </a> for full functionality.
          </p>
        </div>
      )}

      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Filter Buttons */}
      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setFilter("all")}>Show All</button>
        <button onClick={() => setFilter("pending")}>Show Pending</button>
        <button onClick={() => setFilter("done")}>Show Done</button>
      </div>

      <ol>
        {filteredTodos.map((todo) => (
          <li key={todo._id}>
            {editingId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveEdit(todo._id)}>Save</button>
              </>
            ) : (
              <>
                {todo.task} - <b>{todo.status}</b>
                <br />
                <button onClick={() => startEditing(todo._id, todo.task)}>
                  Edit
                </button>
                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                {todo.status !== "done" ? (
                  <button onClick={() => updateStatus(todo._id, "done")}>
                    Done
                  </button>
                ) : (
                  <button onClick={() => updateStatus(todo._id, "pending")}>
                    Pending
                  </button>
                )}
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;