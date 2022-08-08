/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { COLORS, MQ } from '../../styles/Constants'
import defaultImage from '../../assets/image/default-cover-image.png'
import { useState } from 'react'
import ActiveOverlay from '../ActiveOverlay/ActiveOverlay'

const animeCardStyle = css({
  position: 'relative',
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
  onClick?: (isClicked: boolean) => void
  showOverlay?: boolean
}

export default function AnimeCard({imageUrl, title, onClick, showOverlay = false}: AnimeCardProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const handleClick = () => {
    setIsClicked(!isClicked)
    if (onClick) onClick(isClicked)
  }

  return (
    <div css={animeCardStyle} onClick={handleClick}>
      <ActiveOverlay isVisible={isClicked && showOverlay}/>
      <img src={imageUrl || defaultImage} alt={`${title}`} />
      <div css={titleStyle}>{title}</div>
    </div>
  )
}