import { useState } from "react";

const filtros = ["todos", "pendientes", "comprado"];

export default function ListaCompras() {
  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: "Leche",
      comprado: true,
    },
    {
      id: 2,
      nombre: "Pan",
      comprado: false,
    },
    {
      id: 3,
      nombre: "Huevos",
      comprado: false,
    },
  ]);

  const [text, setText] = useState("");
  const [filtro, setFiltro] = useState("todos");

  const AgregarProducto = () => {
    if (!text.trim()) return;

    setProductos((prev) => [
      ...prev,
      {
        id: Date.now(),
        nombre: text,
        comprado: false,
      },
    ]);

    setText("");
  };

  const productosFiltrados =
    filtro === "todos"
      ? productos
      : filtro === "comprado"
      ? productos.filter((p) => p.comprado)
      : productos.filter((p) => !p.comprado);

  return (
    <div className="container">
      <div className="card compras-card">
        <h1>🛒 Lista de Compras</h1>

        <div className="input-row">
          <input
            type="text"
            placeholder="Agregar producto..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && AgregarProducto()
            }
          />

          <button
            className="btn btn-success"
            onClick={AgregarProducto}
          >
            Agregar
          </button>
        </div>

        <div className="contadores">
          <span>
            ✅ Comprados:{" "}
            {productos.filter((p) => p.comprado).length}
          </span>

          <span>
            ⏳ Pendientes:{" "}
            {productos.filter((p) => !p.comprado).length}
          </span>
        </div>

        <div className="filtros">
          {filtros.map((f) => (
            <button
              key={f}
              className={
                filtro === f
                  ? "btn btn-success"
                  : "btn btn-outline-primary"
              }
              onClick={() => setFiltro(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="lista-productos">
          {productosFiltrados.map((producto) => (
            <li key={producto.id}>
              <span
                className={`producto-nombre ${
                  producto.comprado
                    ? "text-decoration-line-through"
                    : ""
                }`}
              >
                {producto.nombre}
              </span>

              <div className="acciones">
                <button
                  className="btn"
                  onClick={() => {
                    setProductos((prev) =>
                      prev.map((p) =>
                        p.id === producto.id
                          ? {
                              ...p,
                              comprado: !p.comprado,
                            }
                          : p
                      )
                    );
                  }}
                >
                  {producto.comprado ? "✅" : "❌"}
                </button>

                <button
                  className="btn"
                  onClick={() => {
                    setProductos((prev) =>
                      prev.filter(
                        (p) => p.id !== producto.id
                      )
                    );
                  }}
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>

        {productos.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No hay productos en la lista.
          </p>
        )}
      </div>
    </div>
  );
}