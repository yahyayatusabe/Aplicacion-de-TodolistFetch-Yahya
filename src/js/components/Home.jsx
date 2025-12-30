import React, { useState } from "react";

export const Home = () => {
  const [todos, setTodos] = useState([
    { done: false, title: "Hacer la cama", id: Math.random() * 10 },
    { done: false, title: "Lavarme las manos", id: Math.random() * 10 },
    { done: false, title: "Comer", id: Math.random() * 10 },
    { done: false, title: "Pasear al perro", id: Math.random() * 10 },
  ]);

  const [taskInput, setTaskInput] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (taskInput.trim() === "") return;

    setTodos([
      ...todos,
      { title: taskInput, done: false, id: Math.random() * 10 },
    ]);
    setTaskInput("");
  };

  const deleteTask = (taskId) => {
    setTodos(todos.filter((task) => task.id !== taskId));
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
                    className="list-group-item d-flex justify-content-between align-items-center todo-item"
                  >
                    <span className="todo-text">{task.title}</span>
                    <button
                      className="btn btn-sm btn-danger delete-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      ✖
                    </button>
                  </li>
                ))}
              </ul>

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
