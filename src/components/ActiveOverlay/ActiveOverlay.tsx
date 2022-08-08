/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { COLORS } from '../../styles/Constants'

interface ActiveOverlayProps {
  isVisible: boolean
}

const activeOverlayStyle = css({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  background: `${COLORS.black}80`,
  zIndex: 10,
  fontSize: '2rem',
})

export default function ActiveOverlay({ isVisible }: ActiveOverlayProps) {
  if (!isVisible) return null

  return (
    <div css={activeOverlayStyle}>
      <BsFillCheckCircleFill />
    </div>
  )
}