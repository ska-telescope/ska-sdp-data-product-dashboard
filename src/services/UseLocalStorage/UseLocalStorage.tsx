import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [value, setValue] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      }
    } catch (error) {
      // If error, return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // useEffect to update local storage when the value changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // localStorage values must be strings, so we JSON.stringify the value
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  }, [value, key]); // Reruns if value or key changes

  return [value, setValue];
}

export default useLocalStorage;