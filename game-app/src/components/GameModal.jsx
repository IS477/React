import { useEffect } from 'react';

export default function GameModal({
  game,
  isFav,
  onToggleFav,
  onClose,
}) {
  // Cerrar modal al presionar Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  if (!game) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <img
          className="modal-img"
          src={game.thumbnail}
          alt={game.title}
        />

        <div className="modal-body">
          <button className="modal-close" onClick={onClose}>
            ✕ Cerrar
          </button>

          <div className="modal-title">{game.title}</div>

          <div className="modal-desc">
            {game.short_description || 'Sin descripción.'}
          </div>

          <div className="modal-meta">
            <div className="meta-item">
              <div className="meta-label">Género</div>
              <div className="meta-val">{game.genre}</div>
            </div>

            <div className="meta-item">
              <div className="meta-label">Plataforma</div>
              <div className="meta-val">{game.platform}</div>
            </div>

            <div className="meta-item">
              <div className="meta-label">Desarrollador</div>
              <div className="meta-val">{game.developer || '—'}</div>
            </div>

            <div className="meta-item">
              <div className="meta-label">Lanzamiento</div>
              <div className="meta-val">{game.release_date || '—'}</div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className={`btn btn-sm ${
              isFav ? 'btn-success' : 'btn-secondary'
            }`}
            onClick={() => onToggleFav(game.id)}
          >
            {isFav
              ? '❤️ Quitar de favoritos'
              : '🤍 Añadir a favoritos'}
          </button>

          <a
            href={game.game_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            Jugar gratis ↗
          </a>
        </div>
      </div>
    </div>
  );
}