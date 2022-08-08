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
import Button from '../../components/Button/Button'
import logo from '../../assets/image/logo.png'

const AnimeListPageStyle = css({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: `calc(${HEADER_HEIGHT[0]}px + 0.25rem)`,
  paddingBottom: 72,
  '.pagination': {
    marginTop: '1.5rem',
  },
  [MQ[0]]: {
    paddingTop: `calc(${HEADER_HEIGHT[1]}px + 0.25rem)`,
  },
  header: {
    padding: '0 1rem',
    width: 'calc(100vw - 2 * 1rem)',
    justifyContent: 'center',
    flexDirection: 'column',
    height: HEADER_HEIGHT[0],
    fontSize: '1.25rem',
    [MQ[0]]: {
      height: HEADER_HEIGHT[1],
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
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

const btnContainerStyle = css({
  display: 'flex',
  gap: '0.5rem',
})

const logoContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  img: {
    height: 60,
    marginRight: '1rem',
  },
})

const instructionStyle = css({
  fontWeight: 'normal',
  textAlign: 'center',
  padding: '0.25rem',
  fontSize: '1.125rem'
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
    handleCancel()
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

  const handleCancel = () => {
    setChosenAnimes([])
    setIsBulkChooseActive(false)
  }

  if (loading) return <Loading wrapperCss={loadingPageStyle} message='Loading Anime List' />
  // TODO: Create Error Component
  if (error) return <div>{JSON.stringify(error)}</div>

  return (
    <div id='animeListPage' css={AnimeListPageStyle}>
      <Header>
        <span css={logoContainerStyle}>
          {!isBulkChooseActive && <img src={logo} alt='AniCo logo' />}
          {isBulkChooseActive ? <span css={instructionStyle}>Select at least 1 Anime to proceed</span> : 'AniCo'}
        </span>
        <span css={btnContainerStyle}>
          {isBulkChooseActive &&
            <Button
              text='Cancel'
              type='ghost'
              isLarge
              onClick={handleCancel}
            />}
          <AnimeBulkChooseButton
            isActive={isBulkChooseActive}
            setIsActive={setIsBulkChooseActive}
            chosenAnimes={chosenAnimes}
            setChosenAnimes={setChosenAnimes}
          />
        </span>
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