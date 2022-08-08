/** @jsxImportSource @emotion/react */
import AnimeCard from '../../components/Anime/AnimeCard'
import { css } from '@emotion/react'
import { COLORS, MQ } from '../../styles/Constants'
import useLocalStorage, { LS_KEY } from '../../hooks/useLocalStorage'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ANIME_DETAIL, AnimeDetailData, AnimeDetailVars } from '../../gql/queries'
import { Collections } from '../../components/Collection/AddToCollectionButton'
import { IoIosArrowBack } from 'react-icons/io'
import { BsFillTrashFill } from 'react-icons/bs'
import { useState } from 'react'
import ConfirmationModal from '../../components/Modal/ConfirmationModal/ConfirmationModal'
import Empty from '../../components/Empty/Empty'
import Loading from '../../components/Loading/Loading'
import { ImPencil } from 'react-icons/im'
import EditNameModal from '../../components/Modal/EditNameModal/EditNameModal'
import Header, { HEADER_HEIGHT } from '../../components/Header/Header'

const collectionDetailPageStyle = css({
  overflowX: 'hidden',
  paddingTop: `calc(${HEADER_HEIGHT[1]}px + 0.25rem)`,
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: 72,
  '.pagination': {
    marginTop: '1.5rem',
  },
})

const collectionDetailStyle = css({
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

const emptyStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: `calc(100vh - 2 * 1rem - ${HEADER_HEIGHT[1]}px)`,
  padding: 0,
})

const editButtonStyle = css({
  display: 'flex',
  margin: '0 1rem',
  padding: '0.5rem 0.75rem',
  fontSize: '1rem',
  borderRadius: '0.25rem',
  border: `solid 1px ${COLORS.green}`,
  backgroundColor: COLORS.black,
  color: COLORS.green,
  cursor: 'pointer',
  svg: {
    margin: '0 0.5rem 0 0',
  },
  '&:hover': {
    filter: 'brightness(0.8)',
  },
})

const headerWrapperStyle = css({
  svg: {
    cursor: 'pointer',
    margin: '0 1rem',
    '&:hover': {
      filter: 'brightness(0.8)',
    },
  },
})

export default function CollectionDetailPage() {
  const params = useParams()
  const collectionId = params.collectionId!
  const [collections] = useLocalStorage<Collections>(LS_KEY.COLLECTIONS, {})
  const [showModal, setShowModal] = useState<boolean>(false)
  const navigate = useNavigate()
  const currentCollection = collections[collectionId]
  const isEmpty = currentCollection.length < 1

  return (
    <>
      <div css={headerWrapperStyle}>
        <Header>
          <IoIosArrowBack onClick={() => navigate('/collections')} />
          {collectionId}
          <button css={editButtonStyle} onClick={() => setShowModal(true)}>
            <ImPencil />
            Edit
          </button>
          <EditNameModal
            id={collectionId}
            onClose={() => setShowModal(false)}
            isVisible={showModal}
            isNavigateOnSubmit={true}
          />
        </Header>
      </div>
      <div css={[collectionDetailPageStyle, isEmpty && emptyStyle]}>
        {isEmpty ?
          <Empty message={`You haven't added any anime to this collection.`} />
          :
          <div css={collectionDetailStyle}>
            {currentCollection.map(id => <CollectionAnimeCard id={id} key={id} />)}
          </div>
        }
      </div>
    </>
  )
}

const collectionCardLoadingStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: COLORS['dark-gray'],
  borderRadius: '0.5rem',
  height: 315,
  [MQ[1]]: {
    height: 440,
  },
})

function CollectionAnimeCard({ id }: { id: number }) {
  const { data, error, loading } = useQuery<AnimeDetailData, AnimeDetailVars>(ANIME_DETAIL, { variables: { id } })
  const navigate = useNavigate()

  // TODO: Create Loading Component
  if (loading) return <Loading wrapperCss={collectionCardLoadingStyle} />
  // TODO: Create Error Component
  if (error) return <div>{JSON.stringify(error)}</div>

  return (
    <div css={css({ position: 'relative' })}>
      <AnimeCard
        key={id}
        imageUrl={data?.Media.coverImage.large || data?.Media.bannerImage}
        title={data?.Media.title.romaji || ''}
        onClick={() => navigate(`/animes/${id}`)}
      />
      <RemoveAnimeButton id={id} title={data?.Media.title.romaji || 'this anime'} />
    </div>
  )
}

const removeAnimeButtonStyle = css({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '100%',
  padding: '0.5rem',
  fontSize: '1.5rem',
  backgroundColor: COLORS['dark-gray'],
  cursor: 'pointer',
  '&:hover': {
    color: 'darkred',
  },
})

function RemoveAnimeButton({ id, title }: { id: number, title: string }) {
  const [showModal, setShowModal] = useState<boolean>(false)
  // eslint-disable-next-line
  const [_collections, setCollections] = useLocalStorage<Collections>(LS_KEY.COLLECTIONS, {})
  const params = useParams()
  const collectionId = params.collectionId!

  const handleDelete = () => {
    setCollections(prevState => {
      return { ...prevState, [collectionId]: prevState[collectionId].filter(animeId => animeId !== id) }
    })
  }

  return (
    <div css={removeAnimeButtonStyle}>
      <BsFillTrashFill onClick={() => setShowModal(true)} />
      <ConfirmationModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        onSubmit={handleDelete}
        header='Delete Collection'
      >
        Are you sure you want to delete {title}?
      </ConfirmationModal>
    </div>
  )
}