/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { COLORS } from '../../styles/Constants'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

interface PaginationProps {
  page: number
  disablePrev: boolean
  disableNext: boolean
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
    },
    '&:disabled': {
      opacity: 0,
      cursor: 'default',
      filter: 'none'
    },
  }
})

export default function Pagination({ page, disableNext, disablePrev, onNext, onPrev }: PaginationProps) {
  return (
    <div className='pagination' css={paginationStyle}>
      <button className='btn prev' disabled={disablePrev} onClick={onPrev}><BsArrowLeftCircleFill/></button>
      <span className='currentPage'>{page}</span>
      <button className='btn next' disabled={disableNext} onClick={onNext}><BsArrowRightCircleFill/></button>
    </div>
  )
}