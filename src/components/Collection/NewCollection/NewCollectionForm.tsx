/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { COLORS } from '../../../styles/Constants'
import { useState } from 'react'
import useLocalStorage, { LS_KEY } from '../../../hooks/useLocalStorage'
import { useParams } from 'react-router-dom'
import Button from '../../Button/Button'
import { Collections } from '../AddToCollectionButton'

const collectionFormStyle = css({
  marginTop: '1rem',
  padding: '1rem',
  borderRadius: '0.25rem',
  backgroundColor: COLORS.black,
})

const labelStyle = css({ fontSize: '0.875rem', paddingBottom: '0.25rem' })

const inputStyle = css({
  display: 'flex',
  width: 'calc(100% - 1rem)',
  flexDirection: 'column',
  marginBottom: '1rem',
  padding: '0.5rem',
  backgroundColor: COLORS['dark-gray'],
  color: COLORS.green,
  borderRadius: '0.25rem',
  border: `solid 1px ${COLORS.green}`,
  outline: 'none',
  '&:hover,&:active': {
    border: `solid 1px ${COLORS.green}`,
  },
})

const errorStyle = css({
  borderColor: 'darkred',
  color: 'darkred',
  '&:hover': {
    borderColor: 'darkred',
  },
})

const validationStyle = css({ fontSize: '0.75rem' })

interface CollectionFormProps {
  collections: Collections
  onCancel: () => void
  onSubmit: () => void
}

export default function NewCollectionForm({ onCancel, onSubmit, collections }: CollectionFormProps) {
  const [name, setName] = useState<string>('')
  const [error, setError] = useState({ specialChars: false, unique: false })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_collections, setCollections] = useLocalStorage(LS_KEY.COLLECTIONS, collections)
  const params = useParams()
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

  const handleSubmit = () => {
    if (params.animeId) {
      const currentCollection = collections[name] || []
      const newAnimeList = [...currentCollection, +params.animeId]
      setCollections({ ...collections, [name]: newAnimeList })
      onSubmit()
    }
    setName('')
  }

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' && !isError) {
      handleSubmit()
    }
  }

  return (
    <div css={collectionFormStyle}>
      <div css={[isError && errorStyle, labelStyle]}>Collection Name</div>
      <input autoFocus css={[inputStyle, isError && errorStyle]} onChange={handleChange} onKeyDown={handleKeydown}
             value={name} />
      <div css={[validationStyle, errorStyle]}>
        {error.specialChars && <span>Your collection name cannot contain special characters.</span>}
        {error.unique && <span>Your collection name must be unique.</span>}
      </div>
      <div css={css({
        marginTop: '1rem',
        display: 'flex',
        gap: '1rem',
      })}>
        <Button text='Cancel' type='ghost' isFullWidth isLarge onClick={onCancel} />
        <Button disabled={isError || !name} text='Submit' isFullWidth isLarge onClick={handleSubmit} />
      </div>
    </div>
  )
}