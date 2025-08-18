import { useState } from 'react'

export default function useLocalStorage(key, initialValue, normalizer) {
  const [storedValue, setStoredValue] = useState(() => {
    let storageValue
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        storageValue = JSON.parse(item)
      }
    } catch (error) {}
    if (typeof initialValue === 'function') {
      initialValue = initialValue()
    }
    const value = storageValue ?? initialValue
    return normalizer ? normalizer(value, true) : value
  })

  const setValue = value => {
    setStoredValue(value)
    try {
      window.localStorage.setItem(key, JSON.stringify(normalizer ? normalizer(value) : value))
    } catch (error) {}
  }

  return [storedValue, setValue]
}
