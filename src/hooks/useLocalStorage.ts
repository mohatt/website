import { useState, useCallback } from 'react'

const UNINITIALIZED = {}

type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue }

interface UseLocalStorageOptions<V> {
  initialValue?: V | (() => V)
}

interface UseLocalStorageNormalizer<T, S extends JSONValue = JSONValue> {
  encode: (value: T) => S
  decode: (value: S) => T
}

// Overload 1: no normalizer
export function useLocalStorage<S extends JSONValue = JSONValue>(
  key: string,
  options?: UseLocalStorageOptions<S>,
): [S, (value: S) => void]

// Overload 2: with normalizer
export function useLocalStorage<T, S extends JSONValue = JSONValue>(
  key: string,
  options: UseLocalStorageOptions<S> & { normalizer: UseLocalStorageNormalizer<T, S> },
): [T, (value: T) => void]

// Implementation
export function useLocalStorage<T, S extends JSONValue = JSONValue>(
  key: string,
  options?: UseLocalStorageOptions<S> & { normalizer?: UseLocalStorageNormalizer<T | S> },
): [T | S, (value: T | S) => void] {
  const { initialValue, normalizer } = options || {}
  const [storedValue, setStoredValue] = useState(() => {
    let parsedValue = UNINITIALIZED as unknown as S
    try {
      const rawValue = window.localStorage.getItem(key)
      if (rawValue !== null) {
        parsedValue = JSON.parse(rawValue)
      }
    } catch {
      // If it throws for any reason (localStorage API not available, SSR, malformed value, etc.),
      // fallback to `initialValue`
    }
    const value =
      parsedValue === UNINITIALIZED
        ? typeof initialValue === 'function'
          ? initialValue()
          : initialValue
        : parsedValue
    return normalizer ? normalizer.decode(value) : value
  })

  // Keep localStorage in sync if the value is updated
  const setValue = useCallback(
    (value: T | S) => {
      setStoredValue(value)
      try {
        const toStore = normalizer ? normalizer.encode(value) : value
        window.localStorage.setItem(key, JSON.stringify(toStore))
      } catch {
        // ignore storage errors
      }
    },
    [key, normalizer],
  )

  return [storedValue, setValue]
}
