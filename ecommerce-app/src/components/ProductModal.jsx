export default function ProductModal({ product, loading, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>×</button>

        {loading && <p>Cargando…</p>}

        {!loading && product && (
          <>
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p className="price">${product.price}</p>
            <p>{product.description}</p>
            <ul>
              <li><b>Marca:</b> {product.brand}</li>
              <li><b>Rating:</b> ⭐ {product.rating}</li>
              <li><b>Stock:</b> {product.stock}</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}