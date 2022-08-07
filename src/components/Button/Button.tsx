/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { COLORS } from '../../styles/Constants'
import React from 'react'

interface ButtonProps {
  onClick?: () => void
  text?: React.ReactNode
  Icon?: React.ReactNode
  isFullWidth?: boolean
  disabled?: boolean
  type?: 'primary' | 'ghost'
  isLarge?: boolean
  css?: any
}

const buttonStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1rem',
  border: `solid 1px ${COLORS.green}`,
  borderRadius: '0.25rem',
  cursor: 'pointer',
  outline: 'none',
  svg: {
    fontSize: '1.5rem',
    marginRight: '0.25rem',
  },
  '.text': {
    position: 'relative',
    top: 1,
  },
  '&:hover,&:active': {
    filter: 'brightness(0.8)',
  },
  '&:disabled': {
    backgroundColor: COLORS.gray,
    filter: 'none',
    cursor: 'not-allowed',
    border: `solid 1px ${COLORS.gray}`,
  },
})

const primaryStyle = css({
  backgroundColor: COLORS.green,
  color: COLORS.black,
})

const ghostStyle = css({
  backgroundColor: 'transparent',
  color: COLORS.green
})

const largeStyle = css({
  padding: '0.5rem'
})

const fullWidthStyle = css({
  width: '100%',
})

export default function Button({ onClick, text, Icon, isFullWidth, disabled, type = 'primary', isLarge }: ButtonProps) {
  const typeStyle = () => {
    switch (type) {
      case 'primary':
        return primaryStyle
      case 'ghost':
        return ghostStyle
    }
  }

  return (
    <button
      css={[
        buttonStyle,
        isFullWidth && fullWidthStyle,
        isLarge && largeStyle,
        typeStyle(),
      ]}
      disabled={disabled}
      onClick={onClick}>
      {Icon}<span className='text'>{text}</span>
    </button>
  )
}