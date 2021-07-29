import { useState } from 'react'

export default function useLocalStorage(key, initialValue, normalizer) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        initialValue = JSON.parse(item)
      }
    } catch (error) {}
    return normalizer ? normalizer(initialValue, true) : initialValue
  })

  const setValue = value => {
    setStoredValue(value)
    try {
      window.localStorage.setItem(key, JSON.stringify(normalizer ? normalizer(value) : value))
    } catch (error) {}
  }

  return [storedValue, setValue]
}
