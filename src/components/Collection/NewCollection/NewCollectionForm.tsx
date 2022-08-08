/** @jsxImportSource @emotion/react */
import { COLORS } from '../../../styles/Constants'
import useLocalStorage, { LS_KEY } from '../../../hooks/useLocalStorage'
import { useParams } from 'react-router-dom'
import { Collections } from '../AddToCollectionButton'
import { useNameValidation } from '../../../hooks/useNameValidation'
import CollectionForm from '../CollectionForm/CollectionForm'

interface NewCollectionFormProps {
  onCancel: () => void
  onSubmit: () => void
  color?: string
  inputColor?: string
  chosenAnimes?: number[]
}

export default function NewCollectionForm({
  onCancel,
  onSubmit,
  color = COLORS.black,
  inputColor = COLORS['dark-gray'],
  chosenAnimes
}: NewCollectionFormProps) {
  const { name, error, isError, validateName, resetState } = useNameValidation('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [collections, setCollections] = useLocalStorage<Collections>(LS_KEY.COLLECTIONS, {})
  const params = useParams()

  const handleSubmit = () => {
    const currentCollection = collections[name] || []
    const newAnimeList = params.animeId ? [...currentCollection, +params.animeId] :  chosenAnimes ? [...currentCollection, ...chosenAnimes] : []
    setCollections({ ...collections, [name]: newAnimeList })
    if (name && !isError) {
      onSubmit()
      resetState()
    }
  }

  return (
    <CollectionForm
      name={name}
      error={error}
      isError={isError}
      onChange={validateName}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      color={color}
      inputColor={inputColor}
    />
  )
}