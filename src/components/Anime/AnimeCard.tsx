/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { COLORS, MQ } from '../../styles/Constants'
import defaultImage from '../../assets/image/default-cover-image.png'

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
    height: 250,
    [MQ[1]]: {
      height: 375
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
  width: '100%'
})

interface AnimeCardProps {
  imageUrl?: string
  title: string
  onClick?: () => void
}

export default function AnimeCard({imageUrl, title, onClick}: AnimeCardProps) {

  return (
    <div css={animeCardStyle} onClick={onClick}>
      <img src={imageUrl || defaultImage} alt={`${title}`} />
      <div css={titleStyle}>{title}</div>
    </div>
  )
}