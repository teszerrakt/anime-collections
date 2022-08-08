import { useState } from 'react'
import useLocalStorage, { LS_KEY } from './useLocalStorage'
import { Collections } from '../components/Collection/AddToCollectionButton'

export interface NameError {
  specialChars: boolean
  unique: boolean
}

export function useNameValidation(initialState: string) {
  const [name, setName] = useState<string>(initialState)
  const [error, setError] = useState<NameError>({ specialChars: false, unique: false })
  const [collections] = useLocalStorage<Collections>(LS_KEY.COLLECTIONS, {})
  const isError = error.specialChars || error.unique

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    // eslint-disable-next-line
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    const isContainingSpecialChars = specialChars.test(value)
    const isNotUnique = collections.hasOwnProperty(value)

    setName(value)
    setError({ specialChars: isContainingSpecialChars, unique: isNotUnique })
  }

  const resetState = () => {
    setName(initialState)
    setError({
      specialChars: false,
      unique: false
    })
  }

  return {name, error, isError, validateName: handleChange, resetState}
}