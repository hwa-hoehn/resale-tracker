import { useEffect, useState } from 'react'

// Custom hook: same API as useState, but reads its initial value from
// localStorage and writes back on every change via useEffect. This is how
// the app persists data without a backend.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
