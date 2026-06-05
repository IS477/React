import { useState } from "react";

function App() {
  const [contador, setContador] = useState(0);
  const [text, setText] = useState("");

  const [frutas, setFrutas] = useState([
    "Manzana",
    "Pera",
    "Mango"
  ]);

  const [nuevaFruta, setNuevaFruta] = useState("");

  const AgregarFruta = () => {
    if (!nuevaFruta.trim()) return;

    setFrutas(prev => [...prev, nuevaFruta]);
    setNuevaFruta("");
  };

  const [estudiantes, setEstudiantes] = useState([
    { id: 1, nombre: "Ana", aprobado: false },
    { id: 2, nombre: "Luis", aprobado: false }
  ]);

  return (
    <div className="container py-4">

      {/* ESTUDIANTES */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="card-title mb-3">Estudiantes</h2>

          <table className="table table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Aprobado</th>
              </tr>
            </thead>

            <tbody>
              {estudiantes.map(estudiante => (
                <tr
                  key={estudiante.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setEstudiantes(prev =>
                      prev.map(est =>
                        est.id === estudiante.id
                          ? {
                              ...est,
                              aprobado: !est.aprobado
                            }
                          : est
                      )
                    );
                  }}
                >
                  <td>{estudiante.nombre}</td>
                  <td>{estudiante.aprobado ? "✅" : "❌"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <small className="text-muted">
            Haz clic en un estudiante para cambiar su estado.
          </small>
        </div>
      </div>

      {/* CONTADOR */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="card-title mb-3">Contador</h2>

          <h3>{contador}</h3>

          <button
            className="btn btn-success"
            onClick={() => setContador(c => c + 1)}
          >
            +
          </button>

          <button
            className="btn btn-danger ms-2"
            onClick={() => contador > 0 && setContador(c => c - 1)}
          >
            -
          </button>
        </div>
      </div>

      {/* TEXTO ESPEJO */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="card-title mb-3">Texto espejo</h2>

          <input
            type="text"
            className="form-control"
            placeholder="Escribe algo..."
            value={text}
            onChange={e => setText(e.target.value)}
          />

          <p className="mt-3 mb-0">
            <strong>Texto:</strong> {text}
          </p>
        </div>
      </div>

      {/* FRUTAS */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-3">Lista de frutas</h2>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nueva fruta..."
              value={nuevaFruta}
              onChange={e => setNuevaFruta(e.target.value)}
              onKeyDown={e =>
                e.key === "Enter" && AgregarFruta()
              }
            />

            <button
              className="btn btn-primary"
              onClick={AgregarFruta}
            >
              Agregar
            </button>
          </div>

          <ul className="list-group">
            {frutas.map(fruta => (
              <li
                key={fruta}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {fruta}

                <button
                  className="btn btn-danger btn-sm"
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

    </div>
  );
}

export default App;