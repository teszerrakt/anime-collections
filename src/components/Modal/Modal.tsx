/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { css } from '@emotion/react'
import { COLORS, MQ } from '../../styles/Constants'

export interface ModalProps {
  isVisible: boolean
  header?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  onClose?: () => void
}

const modalOverlayStyle = css({
  backgroundColor: `${COLORS.black}CC`,
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 100,
})

const modalContainerStyle = css({
  backgroundColor: COLORS['dark-gray'],
  color: COLORS.green,
  width: '100%',
  margin: '1rem',
  marginTop: 100,
  borderRadius: '0.5rem',
  [MQ[0]]: {
    width: 500,
  },
  '> *': {
    padding: '1rem',
  },
})

const modalHeaderStyle = css({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  borderBottom: `solid 1px ${COLORS.green}`,
})

const Modal = ({ isVisible, header, footer, children, onClose }: ModalProps) => {
  const showModal = (isVisible)

  useEffect(() => {
    document.body.style.overflow = isVisible ? 'hidden' : 'unset'
  }, [isVisible])

  return showModal ? ReactDOM.createPortal(
    <>
      <div css={modalOverlayStyle} onClick={onClose}>
        <div css={modalContainerStyle} onClick={event => event.stopPropagation()}>
          {header && <div css={modalHeaderStyle}>{header}</div>}
          {children && <div>{children}</div>}
          {footer && <div>{footer}</div>}
        </div>
      </div>
    </>, document.body,
  ) : null
}

export default Modal