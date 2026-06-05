import { useState, useMemo, useCallback, useReducer } from 'react';
import { useFetchGames } from './hooks/useFetchGame';
import { useFavorites } from './hooks/useFavorites';
import GameCard from './components/GameCard';
import GameModal from './components/GameModal';

// 1. CONSTANTES
const API = '/api-games/games';
const POR_PAGINA = 12;

// 2. useReducer: estado de filtros (Paso 10)
const initialFilters = {
  busqueda: '',
  genero: 'todos',
  plat: 'todos',
  orden: 'titulo',
  pagina: 1,
};

function filtersReducer(state, action) {
  switch (action.type) {
    case 'SET_BUSQUEDA':
      return { ...state, busqueda: action.payload, pagina: 1 };
    case 'SET_GENERO':
      return { ...state, genero: action.payload, pagina: 1 };
    case 'SET_PLAT':
      return { ...state, plat: action.payload, pagina: 1 };
    case 'SET_ORDEN':
      return { ...state, orden: action.payload, pagina: 1 };
    case 'NEXT_PAGE':
      return { ...state, pagina: state.pagina + 1 };
    case 'RESET':
      return initialFilters;
    default:
      return state;
  }
}

// COMPONENTE PRINCIPAL
export default function GamesApp() {

  // Datos desde custom hook (Paso 8)
  const { data: juegos, cargando, error } = useFetchGames(API);

  // Favoritos desde custom hook (Paso 8)
  const { favs, toggle, isFav, count: favCount } = useFavorites('ftg-favs');

  // Filtros con useReducer (Paso 10)
  const [filters, dispatch] = useReducer(filtersReducer, initialFilters);
  const { busqueda, genero, plat, orden, pagina } = filters;

  // UI local
  const [tab, setTab] = useState('todos');
  const [modalGame, setModalGame] = useState(null);

  // useMemo: generos unicos (Paso 7)
  const generos = useMemo(() =>
    ['todos', ...[...new Set(juegos.map(g => g.genre))].sort()],
    [juegos]
  );

  // useMemo: filtrar + ordenar (Paso 7)
  const filtrados = useMemo(() => {
    let lista = tab === 'favs'
      ? juegos.filter(g => favs.includes(g.id))
      : juegos;

    lista = lista.filter(g =>
      (genero === 'todos' || g.genre === genero) &&
      (plat === 'todos' || g.platform === plat) &&
      g.title.toLowerCase().includes(busqueda.toLowerCase())
    );

    if (orden === 'titulo')
      lista = [...lista].sort((a, b) => a.title.localeCompare(b.title));
    if (orden === 'fecha')
      lista = [...lista].sort((a, b) => b.release_date.localeCompare(a.release_date));
    if (orden === 'genero')
      lista = [...lista].sort((a, b) => a.genre.localeCompare(b.genre));

    return lista;
  }, [juegos, tab, favs, genero, plat, busqueda, orden]);

  // useMemo: paginacion (Paso 7)
  const paginados = useMemo(() =>
    filtrados.slice(0, pagina * POR_PAGINA),
    [filtrados, pagina]
  );

  // useCallback: handlers estables (Paso 9)
  const handleToggleFav = useCallback((id) => toggle(id), [toggle]);
  const handleSelectGame = useCallback((g) => setModalGame(g), []);
  const handleCloseModal = useCallback(() => setModalGame(null), []);
  const handleLoadMore = useCallback(() => dispatch({ type: 'NEXT_PAGE' }), []);

  // RENDERIZADO CONDICIONAL (Paso 6)
  if (cargando) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <span>Cargando juegos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="error-msg">❌ {error}</div>
        <button className="btn btn-secondary"
          onClick={() => window.location.reload()}>
          ↺ Reintentar
        </button>
      </div>
    );
  }

  const hasMore = paginados.length < filtrados.length;

  // RENDER PRINCIPAL
  return (
    
        <main>
          <header>
            <h1>🎮 Free To Play Games</h1>
      
            <section>
              <p>Total cargados: {juegos.length}</p>
              <p>Mostrando: {paginados.length}</p>
              <p>Filtrados: {filtrados.length}</p>
              <p>Favoritos: {favCount}</p>
            </section>
          </header>
      
          <nav>
            <button onClick={() => setTab('todos')}>
              🎮 Todos
            </button>
      
            <button onClick={() => setTab('favs')}>
              ❤️ Favoritos ({favCount})
            </button>
          </nav>
      
          <section>
            <input
              type="text"
              placeholder="Buscar juego..."
              value={busqueda}
              onChange={(e) =>
                dispatch({
                  type: 'SET_BUSQUEDA',
                  payload: e.target.value,
                })
              }
            />
      
            <select
              value={orden}
              onChange={(e) =>
                dispatch({
                  type: 'SET_ORDEN',
                  payload: e.target.value,
                })
              }
            >
              <option value="titulo">A-Z</option>
              <option value="fecha">Más nuevos</option>
              <option value="genero">Por género</option>
            </select>
      
            <button onClick={() => dispatch({ type: 'RESET' })}>
              Limpiar filtros
            </button>
          </section>
      
          <section>
            <h3>Géneros</h3>
      
            {generos.slice(0, 10).map((g) => (
              <button
                key={g}
                onClick={() =>
                  dispatch({
                    type: 'SET_GENERO',
                    payload: g,
                  })
                }
              >
                {g}
              </button>
            ))}
          </section>
      
          <section>
            <h3>Plataformas</h3>
      
            {['todos', 'PC (Windows)', 'Web Browser'].map((p) => (
              <button
                key={p}
                onClick={() =>
                  dispatch({
                    type: 'SET_PLAT',
                    payload: p,
                  })
                }
              >
                {p === 'todos'
                  ? 'Todas'
                  : p === 'PC (Windows)'
                  ? '🖥 PC'
                  : '🌐 Web'}
              </button>
            ))}
          </section>
      
          <section>
            {tab === 'favs' && favs.length === 0 ? (
              <div>
                <h2>🤍 Sin favoritos</h2>
                <p>
                  Haz clic en el corazón de cualquier juego para
                  agregarlo.
                </p>
              </div>
            ) : paginados.length === 0 ? (
              <div>
                <h2>🔍 Sin resultados</h2>
                <p>No hay juegos que coincidan con el filtro.</p>
              </div>
            ) : (
              <div>
                {paginados.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    isFav={isFav(game.id)}
                    onToggleFav={handleToggleFav}
                    onClick={handleSelectGame}
                  />
                ))}
              </div>
            )}
          </section>
      
          {hasMore && (
            <section>
              <button onClick={handleLoadMore}>
                Cargar más (
                {filtrados.length - paginados.length} restantes)
              </button>
            </section>
          )}
      
          {modalGame && (
            <GameModal
              game={modalGame}
              isFav={isFav(modalGame.id)}
              onToggleFav={handleToggleFav}
              onClose={handleCloseModal}
            />
          )}
        </main>
      );
}