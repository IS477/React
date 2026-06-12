import { useState } from "react";

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2>🔢 Contador</h2>

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
  );
}

export default Contador;