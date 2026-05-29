import { useState } from 'react'

function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto]  = useState('');

  const agregar = () => {
    if (!texto.trim()) return;
    setTareas([...tareas, {
      id: Date.now(),
      texto,
      hecha: false
    }]);
    setTexto('');
  };

  const completar = (id) => {
    setTareas(tareas.map(t =>
      t.id === id ? { ...t, hecha: !t.hecha } : t
    ));
  };

  const eliminar = (id) => {
    setTareas(tareas.filter(t => t.id !== id));
  };

  return (
    <div>
      <input
        value={texto}
        onChange={e => setTexto(e.target.value)}
      />
      <button onClick={agregar}>+</button>

      {tareas.map(tarea => (
        <div key={tarea.id}>
          <button onClick={()=>completar(tarea.id)}>✅</button>
          {tarea.texto}

          <button onClick={() => eliminar(tarea.id)}>
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export default ListaTareas;