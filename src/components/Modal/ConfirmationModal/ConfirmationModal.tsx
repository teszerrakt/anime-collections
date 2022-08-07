/** @jsxImportSource @emotion/react */
import Modal, { ModalProps } from '../Modal'
import { css } from '@emotion/react'
import Button from '../../Button/Button'

interface ConfirmationModalProps extends Omit<ModalProps, 'footer'> {
  onSubmit?: () => void
  onCancel?: () => void
}

const modalFooterStyle = css({
  display: 'flex',
  gap: '1rem',
})


export default function ConfirmationModal({
  isVisible,
  header,
  children,
  onClose,
  onSubmit,
  onCancel
}: ConfirmationModalProps) {
  return (
    <Modal
      isVisible={isVisible}
      header={header}
      onClose={onClose}
      footer={
        <div css={modalFooterStyle}>
          <Button text='Cancel' type='ghost' isFullWidth isLarge onClick={onCancel} />
          <Button text='Ok' isFullWidth isLarge onClick={onSubmit} />
        </div>}
    >
      {children}
    </Modal>
  )
}