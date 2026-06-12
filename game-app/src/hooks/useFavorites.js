import { useState, useEffect, useCallback } from 'react';

export function useFavorites(key = 'favs') {
  const [favs, setFavs] = useState(() =>
    JSON.parse(localStorage.getItem(key) ?? '[]')
  );

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