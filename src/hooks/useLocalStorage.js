import { useState, useEffect } from "react";

/** useLocalStorage
 * Syncs state to localStorage so data persists across refreshes.
 */
function useLocalStorage(key, defaultValue = null) {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : defaultValue;
  });

  useEffect(() => {
    if (state === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorage;
