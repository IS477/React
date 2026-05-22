import { useState } from 'react'

function Contador() {
  const [cuenta, setCuenta] = useState(0);

  const incrementar = () => setCuenta(c => c + 1);
  const decrementar = () => setCuenta(c => c - 1);
  const reiniciar    = () => setCuenta(0);

  return (
    <div className="contador">
      <h2>{cuenta}</h2>
      <button onClick={decrementar}>−</button>
      <button onClick={reiniciar}>Reset</button>
      <button onClick={incrementar}>+</button>
    </div>
  );
}

export default Contador;