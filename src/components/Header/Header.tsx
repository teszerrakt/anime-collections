/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { COLORS } from '../../styles/Constants'
import React from 'react'

interface HeaderProps {
  children?: React.ReactNode
}

export const HEADER_HEIGHT = [120, 72]

const headerStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  backgroundColor: COLORS['dark-gray'],
  height: HEADER_HEIGHT[1],
  width: '100vw',
})

export default function Header({ children }: HeaderProps) {
  return (
    <header css={headerStyle}>
      {children}
    </header>
  )
}