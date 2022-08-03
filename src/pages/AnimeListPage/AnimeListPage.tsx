/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useQuery } from '@apollo/client'
import { ANIME_LIST, AnimeListData, AnimeListVars } from '../../gql/queries'
import { MQ } from '../../styles/Constants'
import AnimeCard from '../../components/AnimeCard/AnimeCard'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination'

const AnimeListPageStyle = css({
  display: 'flex',
  flexDirection: 'column',
  '.pagination': {
    marginTop: '1.5rem'
  }
})

const AnimeListStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '1rem',
  [MQ[1]]: {
    gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
  },
})

export default function AnimeListPage() {
  const [page, setPage] = useState<number>(1)
  const { loading, error, data } = useQuery<AnimeListData, AnimeListVars>(ANIME_LIST, {
    variables: {
      page,
      perPage: 10,
    },
  })
  const navigate = useNavigate()
  const isShowNext = data?.Page.pageInfo.hasNextPage

  // TODO: Create Loading Component
  if (loading) return <div>Loading ...</div>
  // TODO: Create Error Component
  if (error) return <div>{JSON.stringify(error)}</div>

  const nextPage = () => {
    let newPage = page + 1
    if (data?.Page.pageInfo.hasNextPage) {
      setPage(newPage)
    }
  }
  const prevPage = () => {
    let newPage = page - 1
    if (page < 1) newPage = 1
    setPage(newPage)
  }

  return (
    <div css={AnimeListPageStyle}>
      <div css={AnimeListStyle}>
        {data?.Page.media.map((anime) => {
          const { title: { romaji }, coverImage: { large }, id } = anime
          return <AnimeCard key={id} imageUrl={large} title={romaji} onClick={() => navigate(`/animes/${id}`)} />
        })}
      </div>
      <Pagination page={page} showPrev={page > 1} showNext={!!isShowNext} onPrev={prevPage} onNext={nextPage} />
    </div>
  )
}