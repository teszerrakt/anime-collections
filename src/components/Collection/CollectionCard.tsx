/** @jsxImportSource @emotion/react */
import { useQuery } from '@apollo/client'
import { ANIME_DETAIL, AnimeDetailData, AnimeDetailVars } from '../../gql/queries'
import useLocalStorage, { LS_KEY } from '../../hooks/useLocalStorage'
import { css } from '@emotion/react'
import { bgOverlay, COLORS } from '../../styles/Constants'
import { Collections } from './AddToCollectionButton'
import { Dispatch, SetStateAction, useState } from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import defaultImage from '../../assets/image/default-banner-image-small.png'

interface CollectionCardProps {
  id: string
  setChosenCollections?: Dispatch<SetStateAction<string[]>>
  onClick?: () => void
  color?: string
}

const collectionCardStyle = (color: string) => css({
  position: 'relative',
  borderRadius: '0.25rem',
  background: color,
  cursor: 'pointer',
  '&:hover': {
    filter: 'brightness(0.6)'
  },
})

const imageStyle = (color: string) => css({
  height: 100,
  borderTopLeftRadius: '0.25rem',
  borderTopRightRadius: '0.25rem',
  backgroundSize: 'cover',
  position: 'relative',
  '&:before': {
    background: `linear-gradient(180deg, ${color}00 0%, ${color} 100%)`,
  },
})

const additionalInfoStyle = css({
  zIndex: 2,
  padding: '0.5rem',
  fontSize: '1.25rem',
  fontWeight: 'bold',
})

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

export default function CollectionCard({ id, setChosenCollections, onClick, color = COLORS.black }: CollectionCardProps) {
  const [isClicked, setIsClicked] = useState(false)
  const [collections] = useLocalStorage<Collections>(LS_KEY.COLLECTIONS, {})
  const currentCollection = collections[id]
  const {
    data,
    error,
    loading,
  } = useQuery<AnimeDetailData, AnimeDetailVars>(ANIME_DETAIL, { variables: { id: currentCollection[0] } })

  // TODO: Create Loading Component
  if (loading) return <div>Loading ...</div>
  // TODO: Create Error Component
  if (error) return <div>{JSON.stringify(error)}</div>

  const handleClick = () => {
    setIsClicked(!isClicked)
    if (setChosenCollections) {
      isClicked ?
        setChosenCollections(prevState => [...prevState.filter(value => value !== id)])
        :
        setChosenCollections(prevState => [...prevState, id])
    }
  }

  return (
    <div css={collectionCardStyle(color)} onClick={setChosenCollections ? handleClick : onClick}>
      {isClicked && <div css={activeOverlayStyle}><BsFillCheckCircleFill /></div>}
      <div css={[bgOverlay, imageStyle(color)]} style={{ backgroundImage: `url(${data?.Media.bannerImage || data?.Media.coverImage.extraLarge || defaultImage})` }} />
      <div css={additionalInfoStyle}>{id} | {currentCollection.length} Anime{currentCollection.length > 1 && 's'}</div>
    </div>
  )
}