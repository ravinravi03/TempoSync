import { useEffect, useState } from "react";
export function useLocalStorage(key, initialValue = null) {
    const [value, setValue] = useState(() => {
      try {
        const data = window.localStorage.getItem(key);
        return data
          ? JSON.parse(data)
          : initialValue;
      } catch {
        return initialValue;
      }
    });
  
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value)); 
    }, [key, value, setValue]);
  
    return [value, setValue];
  }