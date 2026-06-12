import { useState } from "react";

function ListaFrutas() {
  const [frutas, setFrutas] = useState([
    "Manzana",
    "Pera",
    "Mango"
  ]);

  const [nuevaFruta, setNuevaFruta] = useState("");

  const agregarFruta = () => {
    if (!nuevaFruta.trim()) return;

    setFrutas(prev => [...prev, nuevaFruta]);
    setNuevaFruta("");
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2>🍎 Frutas</h2>

        <div className="input-group mb-3">
          <input
            className="form-control"
            value={nuevaFruta}
            onChange={e => setNuevaFruta(e.target.value)}
            onKeyDown={e =>
              e.key === "Enter" && agregarFruta()
            }
          />

          <button
            className="btn btn-primary"
            onClick={agregarFruta}
          >
            Agregar
          </button>
        </div>

        <ul className="list-group">
          {frutas.map(fruta => (
            <li
              key={fruta}
              className="list-group-item d-flex justify-content-between"
            >
              {fruta}

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() =>
                  setFrutas(prev =>
                    prev.filter(f => f !== fruta)
                  )
                }
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListaFrutas;