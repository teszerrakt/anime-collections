/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { COLORS } from '../../styles/Constants'
import React from 'react'

interface ButtonProps {
  onClick?: () => void
  text?: React.ReactNode
  Icon?: React.ReactNode
}

const buttonStyle = css({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1rem',
  border: `solid 1px ${COLORS.green}`,
  backgroundColor: COLORS.green,
  color: COLORS.black,
  borderRadius: '0.25rem',
  cursor: 'pointer',
  svg: {
    fontSize: '1.5rem',
    marginRight: '0.25rem'
  },
  '.text': {
    position: 'relative',
    top: 1,
  },
  '&:hover,&:active': {
    filter: 'brightness(0.8)'
  }
})

export default function Button({onClick, text, Icon}: ButtonProps) {
  return (
    <button css={buttonStyle} onClick={onClick}>
      {Icon}<span className='text'>{text}</span>
    </button>
  )
}