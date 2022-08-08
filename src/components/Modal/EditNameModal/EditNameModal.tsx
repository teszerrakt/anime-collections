/** @jsxImportSource @emotion/react */
import Modal, { ModalProps } from '../Modal'
import { css } from '@emotion/react'
import CollectionForm from '../../Collection/CollectionForm/CollectionForm'
import { useNameValidation } from '../../../hooks/useNameValidation'
import useLocalStorage, { LS_KEY } from '../../../hooks/useLocalStorage'
import { Collections } from '../../Collection/AddToCollectionButton'
import { COLORS } from '../../../styles/Constants'

interface EditNameModalProps extends Omit<ModalProps, 'footer' | 'children' | 'onCancel'> {
  id: string
  onClose: () => void
}

const modalBodyStyle = css({
  form: {
    marginTop: 0,
  }
})

export default function EditNameModal({
  id,
  isVisible,
  onClose,
}: EditNameModalProps) {
  const {name, validateName, error, isError} = useNameValidation(id)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_collections, setCollections] = useLocalStorage<Collections>(LS_KEY.COLLECTIONS, {})

  const handleSubmit = () => {
    setCollections(prevState => {
      const copy = { ...prevState }
      copy[name] = copy[id]
      delete copy[id]
      return copy
    })
  }

  return (
    <Modal
      isVisible={isVisible}
      header={`Edit ${id}`}
      onClose={onClose}
    >
      <div css={modalBodyStyle}>
        <CollectionForm
          name={name}
          error={error}
          isError={isError}
          onChange={validateName}
          onSubmit={handleSubmit}
          onCancel={onClose}
          inputColor={COLORS.black}
          color='transparent'
        />
      </div>
    </Modal>
  )
}