export default function Pagination({ page, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;
    const range = [];
    const delta = 2;
    const left = Math.max(0, page - delta);
    const right = Math.min(totalPages - 1, page + delta);
  
    for (let i = left; i <= right; i++) range.push(i);
  
    return (
      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
        >
          ←
        </button>
  
        {left > 0 && (
          <>
            <button className="page-btn" onClick={() => onPageChange(0)}>1</button>
            {left > 1 && <span className="page-ellipsis">…</span>}
          </>
        )}
  
        {range.map(i => (
          <button
            key={i}
            className={`page-btn ${i === page ? 'active' : ''}`}
            onClick={() => onPageChange(i)}
          >
            {i + 1}
          </button>
        ))}
  
        {right < totalPages - 1 && (
          <>
            {right < totalPages - 2 && <span className="page-ellipsis">…</span>}
            <button className="page-btn" onClick={() => onPageChange(totalPages - 1)}>
              {totalPages}
            </button>
          </>
        )}
  
        <button
          className="page-btn"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1}
        >
          →
        </button>
      </div>
    );
  }