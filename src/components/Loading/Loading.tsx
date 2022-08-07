/** @jsxImportSource @emotion/react */
import { css, keyframes, SerializedStyles } from '@emotion/react'
import { COLORS } from '../../styles/Constants'

interface LoadingProps {
  wrapperCss?: SerializedStyles
  message?: string
}

const ripple = keyframes({
    '0%': {
      top: 36,
      left: 36,
      width: 0,
      height: 0,
      opacity: 0,
    },
    '4.9%': {
      top: 36,
      left: 36,
      width: 0,
      height: 0,
      opacity: 0,
    },
    '5%': {
      top: 36,
      left: 36,
      width: 0,
      height: 0,
      opacity: 1,
    },
    '100%': {
      top: 0,
      left: 0,
      width: 72,
      height: 72,
      opacity: 0,
    },
  },
)

const rippleStyle = css({
  display: 'inline-block',
  position: 'relative',
  width: 80,
  height: 80,
  div: {
    position: 'absolute',
    border: `4px solid ${COLORS.green}`,
    opacity: 1,
    borderRadius: '50%',
    animation: `${ripple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite`,
    '&:nth-of-type(2)': {
      animationDelay: '-0.5s',
    },
  },
})

export default function Loading({ wrapperCss, message }: LoadingProps) {
  return (
    <div css={wrapperCss}>
      <div css={rippleStyle}>
        <div></div>
        <div></div>
      </div>
      <span>{message}</span>
    </div>
  )
}

export const loadingPageStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  fontWeight: 500,
  fontSize: '1.25rem',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80vh',
  width: '100%',
})