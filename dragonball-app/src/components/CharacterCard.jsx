


const RACE_COLORS = {
  'Saiyan':       '#f97316',
  'Namekian':     '#22c55e',
  'Human':        '#3b82f6',
  'Android':      '#8b5cf6',
  'Majin':        '#ec4899',
  'Frieza Race':  '#a78bfa',
  'God':          '#fbbf24',
}

function CharacterCard({ character }) {
  const color = RACE_COLORS[character.race] ?? '#64748b'

  return (
    <div className="character-card">
      <div className="card-img-wrap">
        <img
          src={character.image}
          alt={character.name}
          className="card-img"
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      </div>

      <div className="card-body">
        <h3 className="card-name">{character.name}</h3>

        <span
          className="card-race"
          style={{ background: color + '22', color }}
        >
          {character.race}
        </span>

        <div className="card-stats">
          <div><span className="stat-lbl">⚡ Ki</span> {character.ki}</div>
          <div><span className="stat-lbl">🔥 Max</span> {character.maxKi}</div>
        </div>

        <p className="card-affil">{character.affiliation}</p>
      </div>
    </div>
  )
}

export default CharacterCard