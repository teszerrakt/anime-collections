import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { parseJSON } from '../utils/utils'

type SetValue<T> = Dispatch<SetStateAction<T>>

export enum LS_KEY {
  'COLLECTIONS' = 'COLLECTIONS'
}

export default function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? (parseJSON(item) as T) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error)
      return initialValue
    }
  }, [initialValue, key])

  const [storedValue, setStoredValue] = useState<T>(readValue)

  const setValue: SetValue<T> = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }

      window.dispatchEvent(new Event('local-storage'))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    window.addEventListener('local-storage', () => setStoredValue(readValue()))

    return window.removeEventListener('local-storage', () => setStoredValue(readValue()))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    window.addEventListener('storage', () => setStoredValue(readValue()))

    return window.removeEventListener('storage', () => setStoredValue(readValue()))
    // eslint-disable-next-line 
  }, [])

  return [storedValue, setValue]
}