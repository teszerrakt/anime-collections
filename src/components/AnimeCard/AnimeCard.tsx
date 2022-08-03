/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { COLORS, MQ } from '../../styles/Constants'

const animeCardStyle = css({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  padding: '0.5rem',
  backgroundColor: COLORS['dark-gray'],
  borderRadius: '0.5rem',
  cursor: 'pointer',
  '&:hover,&:focus': {
    filter: 'brightness(0.8)'
  },
  img: {
    objectFit: 'cover',
    borderRadius: '0.25rem',
    width: 150,
    height: 250,
    [MQ[1]]: {
      width: 200,
      height: 300
    }
  }
})

const titleStyle = css({
  marginTop: '1rem',
  height: '2rem',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  fontWeight: 'bold',
  width: 150,
  [MQ[1]]: {
    width: 200
  }
})

interface AnimeCardProps {
  imageUrl: string
  title: string
  onClick?: () => void
}

export default function AnimeCard({imageUrl, title, onClick}: AnimeCardProps) {

  return (
    <div css={animeCardStyle} onClick={onClick}>
      {/* TODO: Add fallback image */}
      <img src={imageUrl} alt={`${title} image`} />
      <div css={titleStyle}>{title}</div>
    </div>
  )
}