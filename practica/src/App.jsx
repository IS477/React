import Contador from "./components/contador";
import TextoEspejo from "./components/espejo";
import ListaFrutas from "./components/frutas";
import Estudiantes from "./components/estudiantes";
import './App.css'
import ListaCompras from "./components/compras";
function App() {
  return (
    <div className="container py-4">
      <ListaCompras/>
      <Estudiantes/>
      <Contador/>
      <TextoEspejo/>
      <ListaFrutas/>
     
    </div>
  );
}

export default App;