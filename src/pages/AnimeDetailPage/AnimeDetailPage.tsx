/** @jsxImportSource @emotion/react */
import { useQuery } from '@apollo/client'
import { ANIME_DETAIL, AnimeDetailData, AnimeDetailVars } from '../../gql/queries'
import { useNavigate, useParams } from 'react-router-dom'
import AnimeHeader from '../../components/Anime/AnimeHeader'
import { Interweave } from 'interweave'
import DetailCard, { DetailInfo } from '../../components/DetailCard/DetailCard'
import { css } from '@emotion/react'
import AddToCollection from '../../components/Collection/AddToCollectionButton'
import useLocalStorage, { LS_KEY } from '../../hooks/useLocalStorage'
import { useEffect, useState } from 'react'
import { AnimeCollection, reverseMapCollections } from '../../utils/utils'
import { IoIosArrowForward } from 'react-icons/io'
import { COLORS } from '../../styles/Constants'
import Loading, { loadingPageStyle } from '../../components/Loading/Loading'

const collectionListStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.25rem',
})

const collectionStyle = css({
  display: 'flex',
  alignItems: 'center',
  span: {
    backgroundColor: COLORS.black,
    padding: '0.25rem 0.5rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    '&:hover': {
      filter: 'brightness(0.8)',
    },
  },
})

export default function AnimeDetailPage() {
  const params = useParams()
  const animeId = params && params.animeId!
  const {
    data,
    error,
    loading,
  } = useQuery<AnimeDetailData, AnimeDetailVars>(ANIME_DETAIL, { variables: { id: +animeId } })
  const [collections] = useLocalStorage(LS_KEY.COLLECTIONS, {})
  const [animeCollections, setAnimeCollections] = useState<AnimeCollection>(() => reverseMapCollections(collections))
  const navigate = useNavigate()
  const collectionList = animeCollections[+animeId]

  useEffect(() => {
    setAnimeCollections(reverseMapCollections(collections))
  }, [collections])

  if (loading) return <Loading wrapperCss={loadingPageStyle} message='Loading Anime Detail'/>
  // TODO: Create Error Component
  if (error) return <div>{JSON.stringify(error)}</div>

  return data ? (
    <div css={css({ paddingBottom: 72 })}>
      <AnimeHeader bannerImage={data.Media.bannerImage || data.Media.coverImage.extraLarge} title={data.Media.title}
                   score={data.Media.averageScore} />
      <div css={css({
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      })}>
        <DetailCard
          header={<div css={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'})}>Collections <AddToCollection />
          </div>}
        >
          {collectionList ?
            <div css={collectionListStyle}>
              {collectionList.map((collection) => (
                <div
                  css={collectionStyle}
                  key={collection}
                  onClick={() => navigate(`/collections/${collection}`)}
                >
                  <span>{collection}<IoIosArrowForward /></span>
                </div>))}
            </div>
            :
            `You haven't add ${data.Media.title.romaji || 'this anime'} to any collections.`
          }
        </DetailCard>
        <DetailCard header='Details'>
          <DetailInfo label='Genres'>{data.Media.genres.join(', ')}</DetailInfo>
          <DetailInfo label='Season'>{data.Media.season}</DetailInfo>
          <DetailInfo label='Year'>{data.Media.seasonYear}</DetailInfo>
          <DetailInfo label='Episodes'>{data.Media.episodes}</DetailInfo>
        </DetailCard>
        <DetailCard header='Descriptions'>
          {/* Interweave is used to safely input HTML to react component without using 'dangerouslySetInnerHTML'  */}
          <Interweave css={css({
            br: {
              display: 'block',
              content: `""`,
              marginTop: '0.75rem',
            },
          })} content={data.Media.description} />
        </DetailCard>
      </div>
    </div>
  ) : <></>
}