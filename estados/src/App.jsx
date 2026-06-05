import { useState } from 'react';
import './App.css'
function App() {
  const [tareas, setTareas] = useState([
    { id: 1, texto: "Aprender React",       completada: false },
    { id: 2, texto: "Crear mi primera app", completada: false },
  ]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  const agregarTarea = () => {
    if (!nuevaTarea.trim()) return;
    setTareas([...tareas, {
      id: Date.now(),
      texto: nuevaTarea,
      completada: false,
    }]);
    setNuevaTarea("");
  };

  const eliminarTarea = (id) =>
    setTareas(tareas.filter(t => t.id !== id));

  const toggleTarea = (id) =>
    setTareas(tareas.map(t =>
      t.id === id ? { ...t, completada: !t.completada } : t
    ));

  const pendientes = tareas.filter(t => !t.completada).length;

  return (
    <div className="app">
      <div className="card">
        <div className="card-header">
          <h1>📝 Mi Lista de Tareas</h1>
          <span className="badge">{pendientes} pendiente(s)</span>
        </div>

        <div className="input-row">
          <input
            className="task-input"
            value={nuevaTarea}
            onChange={e => setNuevaTarea(e.target.value)}
            onKeyDown={e => e.key === "Enter" && agregarTarea()}
            placeholder="Escribe una tarea y presiona Enter..."
          />
          <button className="add-btn" onClick={agregarTarea}>＋</button>
        </div>

        <ul className="task-list">
          {tareas.map(tarea => (
            <li key={tarea.id}
              className={tarea.completada ? "task-item done" : "task-item"}
              onClick={() => toggleTarea(tarea.id)}>
              <div className={tarea.completada ? "checkbox checked" : "checkbox"}>
                {tarea.completada && "✓"}
              </div>
              <span className="task-text">{tarea.texto}</span>
              <button className="del-btn"
                onClick={e => { e.stopPropagation(); eliminarTarea(tarea.id); }}>
                🗑️
              </button>
            </li>
          ))}
        </ul>

        {tareas.length === 0 && (
          <p className="empty">¡Sin tareas! Agrega una arriba ☝️</p>
        )}
      </div>
    </div>
  );
}

export default App;