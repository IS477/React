export default function CartDetail({ cart, loading }) {
  if (loading) return <p>Cargando carrito…</p>;
  if (!cart) return <p>Selecciona un carrito.</p>;

  return (
    <div className="cart-detail">
      <h2>Carrito #{cart.id} (Usuario {cart.userId})</h2>
      <table>
        <tbody>
          {cart.products.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.quantity}</td>
              <td>${p.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total: <b>${cart.total}</b></p>
    </div>
  );
}