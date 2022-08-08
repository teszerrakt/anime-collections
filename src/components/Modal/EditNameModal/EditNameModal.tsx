/** @jsxImportSource @emotion/react */
import Modal, { ModalProps } from '../Modal'
import Button from '../../Button/Button'
import { css } from '@emotion/react/dist/emotion-react.cjs'

interface EditNameModalProps extends Omit<ModalProps, 'footer'> {
  id: string
  onSubmit?: () => void
  onCancel?: () => void
}

const modalFooterStyle = css({
  display: 'flex',
  gap: '1rem',
})

export default function EditNameModal({
  id,
  isVisible,
  header,
  children,
  onClose,
  onSubmit,
  onCancel,
}: EditNameModalProps) {


  return (
    <Modal
      isVisible={isVisible}
      header={header}
      onClose={onClose}
      footer={
        <div css={modalFooterStyle}>
          <Button text='Cancel' type='ghost' isFullWidth isLarge onClick={onCancel} />
          <Button text='Submit' isFullWidth isLarge onClick={onSubmit} />
        </div>}
    >
      {children}
    </Modal>
  )
}