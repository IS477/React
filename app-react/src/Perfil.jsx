function Perfil() {

return (  <div>
    nombre: <input type="text" id='inputname' placeholder='nombre' />
    <button className='counter' onClick={()=>{
      if (document.getElementById('inputname').value.length > 0) {
        return document.getElementById('output').textContent = `Hola ${document.getElementById('inputname').value}`;
      } else {    alert('Por favor, ingresa tu nombre');
      }
    }}>enviar</button>

    <p id='output'></p>
  </div>
)

} 

export default Perfil;