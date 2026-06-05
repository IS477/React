import React from 'react';

// React.memo evita re-renders innecesarios si las props no cambian
const GameCard = React.memo(function GameCard({
  game,
  isFav,
  onToggleFav,
  onClick,
}) {
  return (
    <div className="game-card" onClick={() => onClick(game)}>
      {/* Botón favorito — stopPropagation evita abrir el modal */}
      <button
        className={`fav-btn ${isFav ? 'active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFav(game.id);
        }}
      >
        {isFav ? '❤️' : '🤍'}
      </button>

      <img src={game.thumbnail} alt={game.title} loading="lazy" />

      <div className="game-card-body">
        <div className="game-title">{game.title}</div>

        <div className="game-meta">
          <span className="badge-genre">{game.genre}</span>

          <span className="badge-plat">
            {game.platform === 'PC (Windows)' ? '🖥' : '🌐'}
          </span>
        </div>
      </div>
    </div>
  );
});

export default GameCard;