import React, { useState, useEffect } from "react";

export const Home = () => {
  const API_URL = "https://playground.4geeks.com/todo";
  const USERNAME = "yahya";

  const createUser = async () => {
    const response = await fetch(`${API_URL}/users/${USERNAME}`);
    if (response.status === 404) {
      await fetch(`${API_URL}/users/${USERNAME}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    }
  };
  const loadTodos = async () => {
    const response = await fetch(`${API_URL}/users/${USERNAME}`);
    const data = await response.json();

    if (data.todos) {
      setTodos(data.todos);
    } else {
      setTodos([]);
    }
  };

  useEffect(() => {
    createUser().then(loadTodos);
  }, []);

  const [todos, setTodos] = useState([]);

  const [taskInput, setTaskInput] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (taskInput.trim() === "") return;

    await fetch(`${API_URL}/todos/${USERNAME}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: taskInput,
        is_done: false,
      }),
    });

    setTaskInput("");
    loadTodos();
  };

  const deleteTask = async (taskId) => {
    await fetch(`${API_URL}/todos/${taskId}`, {
      method: "DELETE",
    });

    loadTodos();
  };

  const clearAllTodos = async () => {
    await fetch(`${API_URL}/users/${USERNAME}`, {
      method: "DELETE",
    });
    setTodos([]);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h1 className="text-center text-muted mb-4">todos</h1>

          <div className="card shadow-sm">
            <div className="card-body p-0">
              <form onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  className="form-control border-0 rounded-0 todo-input"
                  placeholder="¿Qué tarea necesitas hacer?"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  autoFocus
                />
              </form>

              <ul className="list-group list-group-flush todo-list">
                {todos.length === 0 && (
                  <li className="list-group-item text-muted no-tasks">
                    No hay tareas, añadir tareas
                  </li>
                )}

                {todos.map((task) => (
                  <li
                    key={task.id}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span>{task.label}</span>
                    <button onClick={() => deleteTask(task.id)}>✖</button>
                  </li>
                ))}
              </ul>
              <div className="card-footer bg-white text-muted small">
                <div className="px-3 py-2">
                  <button
                    className="btn btn-outline-danger btn-sm w-100"
                    onClick={clearAllTodos}
                  >
                    Borrar todas las tareas
                  </button>
                </div>
              </div>
              <div className="card-footer bg-white text-muted small">
                {todos.length} tareas pendientes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
