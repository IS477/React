const productos = [
  { id: 1, nombre: "Laptop",  precio: 1200 },
  { id: 2, nombre: "Mouse",   precio: 25   },
  { id: 3, nombre: "Teclado", precio: 80   },
];

function ListaProductos() {
  return (
    <ul>
      {productos.map((producto) => (
        <li key={producto.id}> 
          {producto.nombre} — ${producto.precio}
        </li>
      ))}
    </ul>
  );
}

export default ListaProductos;