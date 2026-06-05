import { useState, useEffect, useCallback } from 'react';

export function useFavorites(key = 'favs') {
  // Lazy initializer: solo lee localStorage UNA VEZ al montar
  const [favs, setFavs] = useState(() =>
    JSON.parse(localStorage.getItem(key) ?? '[]')
  );

  // Guardar en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(favs));
  }, [favs, key]);

  const toggle = useCallback((id) => {
    setFavs(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  }, []);

  const isFav = useCallback((id) => favs.includes(id), [favs]);

  return { favs, toggle, isFav, count: favs.length };
}