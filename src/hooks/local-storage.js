import { useState } from 'react'

export default function useLocalStorage(key, initialValue) {
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  // Wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = value => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {}
  }

  return [storedValue, setValue]
}
