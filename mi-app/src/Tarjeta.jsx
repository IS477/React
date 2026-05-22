import './Tarjeta.css'

function Tarjeta() {
    return (                        // 2. Retorna JSX
      <div className="tarjeta">
        <h2>Mi Primer Componente</h2>
        <p>¡Hola desde React! 👋</p>
      </div>
    );
  }
  
  export default Tarjeta;  // 3. Exporta el componente
  
  // Uso en App.jsx:
