
import { useEffect, useState } from 'react'
import './App.css'
const BASE_URL = "https://jsonplaceholder.typicode.com/users"

function App() {
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [userselect, setSelect] = useState(null)
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    ciudad: ""
  })
  useEffect(()=>{
    const usuarios = async () => {
      const res = await fetch(BASE_URL)
      const data = await res.json()
      setUser(data)
      setLoading(false)
    }

    usuarios()
  }, [])

  const handlechange = (e)=>{
    setFormulario(prev =>(
      {...prev,
        [e.target.name]: e.target.value
      }
    ))

  const usuariosDetalles = async (id)=>{
    const res = await fetch(`${BASE_URL}/${id}`)
    const data = await res.json()

    setSelect(data)
  }



  const filtrados = user.filter(users => 
    users.name.toLowerCase().includes(busqueda.toLocaleLowerCase())
  )
  if(loading){
    return <h1>cargando...</h1>
  }

  return (
    <>
     <div>

<input type="text"
name='nombre'
value={formulario.nombre}
onChange={handlechange}
placeholder='nombre...'
/>
<input type="text"
name='email'
value={formulario.email}
onChange={handlechange}
placeholder='email...'
/>
    <input type="text"
name='ciudad'
value={formulario.ciudad}
onChange={handlechange}
placeholder='ciudad...'/>


<button onClick={()=>{}}></button>
</div>







      <input type="text" placeholder='buscador...'
      value={busqueda}
      onChange={e=>setBusqueda(e.target.value)}
      />
    <ul>
      <ol>
        {filtrados.map(u => (
          <li key={u.id} onClick={()=>{usuariosDetalles(u.id)}}>
            {u.name}
          </li>
          
        ))}
</ol>
    </ul>
    {userselect && (
  <div className="modal-backdrop-custom">
    <div className="modal-custom">

      <h2>{userselect.name}</h2>

      <hr />

      <p>
        <strong>Email:</strong> {userselect.email}
      </p>

      <p>
        <strong>Teléfono:</strong> {userselect.phone}
      </p>

      <p>
        <strong>Ciudad:</strong> {userselect.address.city}
      </p>

      <p>
        <strong>Empresa:</strong> {userselect.company.name}
      </p>

      <p>
        <strong>web:</strong> {userselect.website}
      </p>

      <button
        className="btn btn-danger"
        onClick={() => setSelect(null)}
      >
        Cerrar
      </button>

    </div>
  </div>
)}

 



    </>
  )
}}

export default App
