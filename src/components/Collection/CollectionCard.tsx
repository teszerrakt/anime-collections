/** @jsxImportSource @emotion/react */
import { useQuery } from '@apollo/client'
import { ANIME_DETAIL, AnimeDetailData, AnimeDetailVars } from '../../gql/queries'
import useLocalStorage, { LS_KEY } from '../../hooks/useLocalStorage'
import { css } from '@emotion/react'
import { bgOverlay, COLORS } from '../../styles/Constants'
import { Collections } from './NewCollection/NewCollection'

interface CollectionCardProps {
  id: string
}

const collectionCardStyle = css({
  borderRadius: '0.25rem',
  background: COLORS.black,
  cursor: 'pointer',
  border: `solid 2px transparent`,
  '&:hover': {
    border: `solid 2px ${COLORS.green}`,
  }
})

const imageStyle = css({
  height: 100,
  borderTopLeftRadius: '0.25rem',
  borderTopRightRadius: '0.25rem',
  backgroundSize: 'cover',
  position: 'relative',
  '&:before': {
    background: `linear-gradient(180deg, ${COLORS.black}00 0%, ${COLORS.black} 100%)`,
  },
})

const additionalInfoStyle = css({
  zIndex: 2,
  padding: '0.5rem',
  fontSize: '1.25rem',
  fontWeight: 'bold'
})

export default function CollectionCard({id}: CollectionCardProps) {
  const [collections] = useLocalStorage<Collections>(LS_KEY.COLLECTIONS, {})
  const currentCollection = collections[id]
  const {
    data,
    error,
    loading,
  } = useQuery<AnimeDetailData, AnimeDetailVars>(ANIME_DETAIL, { variables: { id: currentCollection[0] } })
  
  return (
    <div css={collectionCardStyle}>
      <div css={[bgOverlay, imageStyle]} style={{backgroundImage: `url(${data?.Media.bannerImage})`}}/>
      <div css={additionalInfoStyle}>{id} | {currentCollection.length} Anime{currentCollection.length > 1 && 's'}</div>
    </div>
  )
}