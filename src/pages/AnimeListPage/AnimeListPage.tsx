/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useQuery } from '@apollo/client'
import { ANIME_LIST, AnimeListData, AnimeListVars } from '../../gql/queries'
import { MQ } from '../../styles/Constants'
import AnimeCard from '../../components/Anime/AnimeCard'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination'
import Loading, { loadingPageStyle } from '../../components/Loading/Loading'
import AnimeBulkChooseButton from '../../components/Anime/AnimeBulkChooseButton'
import Header, { HEADER_HEIGHT } from '../../components/Header/Header'

const AnimeListPageStyle = css({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: `calc(${HEADER_HEIGHT}px + 0.25rem)`,
  paddingBottom: 72,
  '.pagination': {
    marginTop: '1.5rem',
  },
})

const AnimeListStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '1rem',
  [MQ[1]]: {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  },
  [MQ[2]]: {
    gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
  },
})

export default function AnimeListPage() {
  const [page, setPage] = useState<number>(1)
  const [isBulkChooseActive, setIsBulkChooseActive] = useState<boolean>(false)
  const [chosenAnimes, setChosenAnimes] = useState<number[]>([])
  const { loading, error, data } = useQuery<AnimeListData, AnimeListVars>(ANIME_LIST, {
    variables: {
      page,
      perPage: 10,
    },
  })
  const navigate = useNavigate()
  const isShowNext = data?.Page.pageInfo.hasNextPage

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

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

  const handleClick = (id: number, isClicked: boolean) => {
    if (isBulkChooseActive) {
      isClicked ?
        setChosenAnimes(prevState => [...prevState.filter(value => value !== id)])
        :
        setChosenAnimes(prevState => [...prevState, id])
    } else {
      navigate(`/animes/${id}`)
    }
  }

  if (loading) return <Loading wrapperCss={loadingPageStyle} message='Loading Anime List' />
  // TODO: Create Error Component
  if (error) return <div>{JSON.stringify(error)}</div>

  return (
    <div id='animeListPage' css={AnimeListPageStyle}>
      <Header>
        <AnimeBulkChooseButton
          isActive={isBulkChooseActive}
          setIsActive={setIsBulkChooseActive}
          chosenAnimes={chosenAnimes}
          setChosenAnimes={setChosenAnimes}
        />
      </Header>
      <div css={AnimeListStyle}>
        {data?.Page.media.map((anime) => {
          const { title: { romaji }, coverImage: { large }, bannerImage, id } = anime
          return (
            <AnimeCard
              key={id}
              imageUrl={large || bannerImage}
              title={romaji}
              onClick={(isClicked) => handleClick(id, isClicked)}
              showOverlay={isBulkChooseActive}
            />
          )
        })}
      </div>
      <Pagination page={page} disablePrev={page === 1} disableNext={!isShowNext} onPrev={prevPage} onNext={nextPage} />
    </div>
  )
}