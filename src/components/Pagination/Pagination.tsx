/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { COLORS } from '../../styles/Constants'

interface PaginationProps {
  page: number
  showPrev: boolean
  showNext: boolean
  onPrev: () => void
  onNext: () => void
}

const paginationStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  '.currentPage': {
    padding: '0 1rem'
  },
  '.btn': {
    backgroundColor: COLORS.green,
    color: COLORS.black,
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover,&:active': {
      filter: 'brightness(0.8)'
    }
  }
})

export default function Pagination({ page, showNext, showPrev, onNext, onPrev }: PaginationProps) {
  return (
    <div className='pagination' css={paginationStyle}>
      {showPrev && <button className='btn prev' onClick={onPrev}>{'<<'}</button>}
      <span className='currentPage'>{page}</span>
      {showNext && <button className='btn next' onClick={onNext}>{'>>'}</button>}
    </div>
  )
}