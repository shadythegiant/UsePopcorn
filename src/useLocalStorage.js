import { useState, useEffect } from "react";
export function useLocalStorage(initialState, key) {
  const [value, setValue] = useState(function () {
    const sotredValue = localStorage.getItem(key);
    return sotredValue ? JSON.parse(sotredValue) : initialState;
  });

  // local Storage effect

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
