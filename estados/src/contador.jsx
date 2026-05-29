import { useState } from "react";



function Contadorr (){
    const [count, setCount] = useState(0)
    const restar = ()=>setCount(count-1)
    const reset = ()=>setCount(0)
    const sumar = ()=> setCount(count+1)

return (
    <div>
        <p>{count}</p>


        <button onClick={restar}>-</button>
        <button onClick={reset}>reiniciar</button>
        <button onClick={sumar}>+</button>
    </div>
)

}



export default Contadorr;
