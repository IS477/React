import './App.css'
import Tarjeta from './Tarjeta'
import PerfilUsuario from './PerfilUsuario'
import Contador from './contador'
import ListaTareas from './ListaEstados'
function App() {
  return (


    <>
      <Tarjeta />

      <PerfilUsuario
        nombre="Ana García"
        cargo="Diseñadora UX"
  
      />

      <PerfilUsuario
        nombre="Carlos López"
        cargo="Dev Frontend"
        
      />

      <Contador />

      <ListaTareas />
    </>

  ) 
}

export default App