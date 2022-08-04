/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { COLORS } from '../../styles/Constants'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

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
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    fontSize: '2rem',
    color: COLORS.green,
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    '&:hover,&:active': {
      filter: 'brightness(0.8)'
    }
  }
})

export default function Pagination({ page, showNext, showPrev, onNext, onPrev }: PaginationProps) {
  return (
    <div className='pagination' css={paginationStyle}>
      {showPrev && <button className='btn prev' onClick={onPrev}><BsArrowLeftCircleFill/></button>}
      <span className='currentPage'>{page}</span>
      {showNext && <button className='btn next' onClick={onNext}><BsArrowRightCircleFill/></button>}
    </div>
  )
}