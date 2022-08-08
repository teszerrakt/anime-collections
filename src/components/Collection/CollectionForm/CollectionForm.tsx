/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Button from '../../Button/Button'
import { COLORS } from '../../../styles/Constants'
import { NameError } from '../../../hooks/useNameValidation'

interface CollectionFormProps {
  name: string
  error: NameError
  isError: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
  onCancel: () => void
  color?: string
  inputColor?: string
}

const collectionFormStyle = (color: string) => css({
  marginTop: '1rem',
  padding: '1rem',
  borderRadius: '0.25rem',
  backgroundColor: color,
})

const labelStyle = css({ fontSize: '0.875rem', paddingBottom: '0.25rem' })

const inputStyle = (inputColor: string) => css({
  display: 'flex',
  width: 'calc(100% - 1rem)',
  flexDirection: 'column',
  marginBottom: '1rem',
  padding: '0.5rem',
  fontSize: 16,
  backgroundColor: inputColor,
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

const CollectionForm = ({
  name,
  error,
  isError,
  color = COLORS.black,
  inputColor = COLORS['dark-gray'],
  onCancel,
  onChange,
  onSubmit,
}: CollectionFormProps) => {

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' && !isError && name) {
      onSubmit()
    }
  }

  return (
    <form css={collectionFormStyle(color)}>
      <div css={[isError && errorStyle, labelStyle]}>Collection Name</div>
      <input
        autoFocus
        css={[inputStyle(inputColor), isError && errorStyle]}
        onChange={onChange}
        onKeyDown={handleKeydown}
        value={name}
      />
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
        <Button disabled={isError || !name} text='Submit' isFullWidth isLarge onClick={onSubmit} />
      </div>
    </form>
  )
}

export default CollectionForm