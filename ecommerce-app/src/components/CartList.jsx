export default function CartList({ carts, selectedId, onSelect }) {
  return (
    <div className="cart-list">
      {carts.map((c) => (
        <button key={c.id}
          className={`cart-chip ${c.id === selectedId ? 'active' : ''}`}
          onClick={() => onSelect(c.id)}>
          Carrito #{c.id} · {c.totalProducts} ítems · ${c.total}
        </button>
      ))}
    </div>
  );
}