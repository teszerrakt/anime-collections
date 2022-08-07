import { Collections } from '../components/Collection/AddToCollectionButton'

export interface AnimeCollection {
  [id: number]: string[]
}

export const reverseMapCollections = (collections: Collections) => {
  let newCollections: AnimeCollection = {}

  for (let key in collections) {
    const currentCollections = collections[key]
    newCollections = currentCollections.reduce((obj, value) => {
      const currentValue = obj[value] || []
      return {...obj, [value]: [...currentValue, key]}
    }, newCollections)
  }

  return newCollections
}

export function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '')
  } catch {
    console.log('parsing error on', { value })
    return undefined
  }
}