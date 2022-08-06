/** @jsxImportSource @emotion/react */
import { useQuery } from '@apollo/client'
import { ANIME_DETAIL, AnimeDetailData, AnimeDetailVars } from '../../gql/queries'
import { useParams } from 'react-router-dom'
import AnimeHeader from '../../components/Anime/AnimeHeader'
import { Interweave } from 'interweave'
import DetailCard, { DetailInfo } from '../../components/DetailCard/DetailCard'
import { css } from '@emotion/react'
import NewCollection from '../../components/Collection/NewCollection/NewCollection'

export default function AnimeDetailPage() {
  const params = useParams()
  const animeId = params && params.animeId!
  const {
    data,
    error,
    loading,
  } = useQuery<AnimeDetailData, AnimeDetailVars>(ANIME_DETAIL, { variables: { id: +animeId } })

  // TODO: Create Loading Component
  if (loading) return <div>Loading ...</div>
  // TODO: Create Error Component
  if (error) return <div>{JSON.stringify(error)}</div>

  return data ? (
    <div css={css({ paddingBottom: 72 })}>
      <AnimeHeader bannerImage={data.Media.bannerImage} title={data.Media.title} score={data.Media.averageScore} />
      <div css={css({
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      })}>
        <DetailCard
          header={<div css={css({ display: 'flex', justifyContent: 'space-between' })}>Details <NewCollection />
          </div>}
        >
          <DetailInfo label='Genres'>{data.Media.genres.join(', ')}</DetailInfo>
          <DetailInfo label='Season'>{data.Media.season}</DetailInfo>
          <DetailInfo label='Year'>{data.Media.seasonYear}</DetailInfo>
          <DetailInfo label='Episodes'>{data.Media.episodes}</DetailInfo>
        </DetailCard>
        <DetailCard header='Descriptions'>
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