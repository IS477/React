import { useState, useEffect } from 'react'
import CharacterCard from './components/CharacterCard'
import Pagination    from './components/Pagination'
import './App.css'

const BASE_URL = 'https://dragonball-api.com/api'

const RACES = ['Todas','Saiyan','Namekian','Human','Android','Majin','Frieza Race']

function App() {
  const [characters,   setCharacters]   = useState([])
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState(null)
  const [search,       setSearch]       = useState('')
  const [selectedRace, setSelectedRace] = useState('Todas')
  const [page,         setPage]         = useState(1)
  const [totalPages,   setTotalPages]   = useState(1)

  useEffect(() => {
    fetchCharacters()
  }, [page, search])

  const fetchCharacters = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({ limit: 12, page })
      if (search.trim()) params.set('name', search.trim())

      const res = await fetch(`${BASE_URL}/characters?${params}`)
      if (!res.ok) throw new Error(`Error ${res.status}`)

      const data = await res.json()
      setCharacters(data.items ?? [])
      setTotalPages(data.meta?.totalPages ?? 1)
    } catch (err) {
      setError(err.message)
      setCharacters([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Filtro de raza (client-side sobre los resultados actuales)
  const filtered = selectedRace === 'Todas'
    ? characters
    : characters.filter(c => c.race === selectedRace)

  return (
    <div className="app">
      <header className="app-header">
        <h1>🐉 Dragon Ball Universe</h1>
        <input
          type="text"
          placeholder="🔍 Buscar personaje..."
          value={search}
          onChange={handleSearch}
          className="search-input"
        />

        
        <div className="race-filters">
          {RACES.map(race => (
            <button
              key={race}
              className={`race-btn ${selectedRace === race ? 'active' : ''}`}
              onClick={() => setSelectedRace(race)}
            >
              {race}
            </button>
          ))}
        </div>
      </header>

      <main className="app-main">
        {loading && (
          <div className="state-container">
            <div className="spinner" />
            <p>Cargando personajes...</p>
          </div>
        )}

        {error && !loading && (
          <div className="state-container">
            <p style={{fontSize:'2rem'}}>❌</p>
            <p>{error}</p>
            <button className="retry-btn" onClick={fetchCharacters}>
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="state-container">
            <p>🔍 Sin resultados{search ? ` para "${search}"` : ''}</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <>
            <div className="characters-grid">
              {filtered.map(c => (
                <CharacterCard key={c.id} character={c} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App