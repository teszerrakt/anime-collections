import { css } from '@emotion/react'

const breakpoints = [576, 768, 992, 1200]

/**
 * MQ[0]: min-width 576px,
 * MQ[1]: min-width 768px,
 * MQ[2]: min-width 992px,
 * MQ[3]: min-width 1200px
 */
export const MQ = breakpoints.map(bp => `@media (min-width: ${bp}px)`)

export const COLORS = {
  black: '#0e0e0e',
  'dark-gray': '#1c1c1c',
  gray: '#757575',
  green: '#57946c',
  yellow: '#ffd700',
}

export const bgOverlay = css({
  '&:before': {
    content: `""`,
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '100%',
    width: '100%',
    background: `linear-gradient(180deg, ${COLORS.black}00 0%, ${COLORS.black}F5 75%, ${COLORS.black} 100%)`,
  },
})