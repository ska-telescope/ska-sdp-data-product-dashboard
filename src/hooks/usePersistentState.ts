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
    } catch (error) {
      console.warn(`Unable to read "${key}" from localStorage, using default value:`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Unable to save "${key}" to localStorage:`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default usePersistentState;
