function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <button
        className="page-btn"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        ← Anterior
      </button>

      <span className="page-info">
        {page} / {totalPages}
      </span>

      <button
        className="page-btn"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Siguiente →
      </button>
    </div>
  )
}

export default Pagination