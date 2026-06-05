import { useState, useEffect } from 'react';

export function useFetchGames(url) {
  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    setCargando(true);
    setError(null);

    const run = async () => {
      try {
        const res = await fetch(url, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setData(await res.json());
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message);
      } finally {
        setCargando(false);
      }
    };
    run();
    return () => ctrl.abort();
  }, [url]);

  return { data, cargando, error };
}