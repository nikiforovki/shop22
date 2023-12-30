import { useState } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
 const [storedValue, setStoredValue] = useState<T>(() => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.log(error);
    return initialValue;
  }
 });

 const setValue = (value: T | ((val: T) => T)): void => {
  try {
    const valueToStore =
      typeof value === 'function' ? (value as (val: T) => T)(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  } catch (error) {
    console.log(error);
  }
 };

 return [storedValue, setValue];  
}



 

