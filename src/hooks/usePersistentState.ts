import { useState, useEffect } from 'react';

/**
 * Like `useState`, but backed by `localStorage` under `key`.
 * The initial value is read from storage on first mount; every subsequent
 * change is written back automatically.
 */
function usePersistentState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      if (!saved) return defaultValue;
      const parsed = JSON.parse(saved) as T | null;
      // A stored `null` would otherwise crash consumers that dereference the value.
      return parsed === null || parsed === undefined ? defaultValue : parsed;
    } catch {
      // Corrupt JSON or storage blocked (e.g. SecurityError): use the default.
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage unavailable or full; keep working with in-memory state.
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default usePersistentState;
