function Saludar({EstasLogueado}){
    return (
        <>
        <div>
            {EstasLogueado ? (
                <h1>bienvenido de nuevo!</h1>




            ): (
                <h1>Hola, por favor inicia sesión.</h1>
            )}


            {EstasLogueado && <button> MI FPEriFL</button>}

            </div>
        
        </>
    )
}

export default Saludar;