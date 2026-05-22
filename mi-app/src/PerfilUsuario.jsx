// Definición del componente con props
function PerfilUsuario({ nombre, cargo, avatar }) {
    return (
      <div className="perfil">
        <img src={avatar} alt={nombre} />
        <h3>{nombre}</h3>
        <p>{cargo}</p>
      </div>
    );
  }


export default PerfilUsuario;
