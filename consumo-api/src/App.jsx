
import { useEffect, useState } from 'react'
import './App.css'
const BASE_URL = "https://jsonplaceholder.typicode.com/users"

function App() {

  //estados
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [userselect, setSelect] = useState(null)
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    ciudad: "",
    compañia: ""
  })
  const [formEditar, setFormEditar] = useState(null)
  const [editando, setEditando] = useState(false)

  //fetch api
  useEffect(()=>{
    const usuarios = async () => {
      const res = await fetch(BASE_URL)
      const data = await res.json()
      setUser(data)
      setLoading(false)
    }

    usuarios()
  }, [])

  //almacena los cambios de cada input
  const handlechange = (e)=>{
    setFormulario(prev =>(
      {...prev,
        [e.target.name]: e.target.value
      }
    ))}

    const handleEditar = (e) => {
      setFormEditar(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }))
    }


    //guardar usuarios de form
const guardarUser = ()=>{
  const {nombre, email, ciudad, telefono, compañia} = formulario

  if (
    !nombre.trim() ||
     !email.trim() ||
      !ciudad.trim() || 
      !telefono.trim()||
      !compañia.trim()

    )return;

    const nuevoUser = {
      id: Date.now(),
      name: nombre,
      email: email,
      phone: telefono,
      address: {
        city: ciudad
      },
      company: {
        name: compañia
      }
    }

  setUser(prev=>[...prev, nuevoUser])
   setFormulario({
    nombre: "",
    email: "",
    telefono: "",
    ciudad: "",
    compañia: ""


  })}



  const usuariosDetalles = async (id)=>{
    const data = user.find(e=>e.id === id)
    setSelect(data)
    setFormEditar(data)
  }



  const filtrados = user.filter(users => 
    users.name.toLowerCase().includes(busqueda.toLocaleLowerCase())
  )

  const eliminar = (id)=>{
    setUser(prev => prev.filter(u => u.id !== id))
  }





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
<input type="email"
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

<input type="tel"
name='telefono'
value={formulario.telefono}
onChange={handlechange}
placeholder='telefono...'/>

<input type="text"
name='compañia'
value={formulario.compañia}
onChange={handlechange}
placeholder='compañia...'/>



<button onClick={guardarUser}>aa</button>
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

    {editando ? (
  <input
    type="text"
    name='name'
    value={formEditar?.name || ""}
    onChange={handleEditar}
  />
) : (
  <h2>{userselect.name}</h2>
)}

      <hr />
      {editando ? (
  <>
    <div className="mb-3">
      <strong>Nombre:</strong>
      <input
        className="form-control"
        type="text"
        name="name"
        value={formEditar?.name || ""}
        onChange={handleEditar}
      />
    </div>

    <div className="mb-3">
      <strong>Email:</strong>
      <input
        className="form-control"
        type="text"
        name="email"
        value={formEditar?.email || ""}
        onChange={handleEditar}
      />
    </div>

    <div className="mb-3">
      <strong>Teléfono:</strong>
      <input
        className="form-control"
        type="text"
        name="phone"
        value={formEditar?.phone || ""}
        onChange={handleEditar}
      />
    </div>

    <div className="mb-3">
      <strong>Ciudad:</strong>
      <input
        className="form-control"
        type="text"
        name="city"
        value={formEditar?.address?.city || ""}
        onChange={handleEditar}
      />
    </div>

    <div className="mb-3">
      <strong>Empresa:</strong>
      <input
        className="form-control"
        type="text"
        name="company"
        value={formEditar?.company?.name || ""}
        onChange={handleEditar}
      />
    </div>
  </>
) : (
  <>
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
  </>
)}

      <div>
      {console.log(userselect.id)}
      <button
        className="btn btn-secondary"
        onClick={() => setSelect(null)}
        >
        Cerrar
      </button>
      {
        editando ? (
          <button 
          className='btn btn-success'
          onClick={()=>{}}
          >guardar</button>
        ):
        <button className='btn btn-primary'
         onClick={()=>{
          setEditando(true)}
          }>editar</button>

      }
      <button className="btn btn-danger"
       onClick={()=>{
            eliminar(userselect.id)
            setSelect(null)
            }
  
  }>🗑️</button>
  </div>
    </div>
  </div>
)}

 



    </>
  )
}

export default App
