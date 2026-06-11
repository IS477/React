export default function ProductList({ products, onSelect }) {
  return (
    <div className="grid">
      {products.map((p) => (
        <article key={p.id} className="card"
                 onClick={() => onSelect(p.id)}>
          <img src={p.thumbnail} alt={p.title} />
          <h3>{p.title}</h3>
          <p className="price">${p.price}</p>
          <span className="badge">{p.category}</span>
        </article>
      ))}
    </div>
  );
}