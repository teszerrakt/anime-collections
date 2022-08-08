/** @jsxImportSource @emotion/react */
import { useQuery } from '@apollo/client'
import { ANIME_DETAIL, AnimeDetailData, AnimeDetailVars } from '../../gql/queries'
import useLocalStorage, { LS_KEY } from '../../hooks/useLocalStorage'
import { css } from '@emotion/react'
import { bgOverlay, COLORS } from '../../styles/Constants'
import { Collections } from './AddToCollectionButton'
import { Dispatch, SetStateAction, useState } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import defaultImage from '../../assets/image/default-banner-image-small.png'
import ConfirmationModal from '../Modal/ConfirmationModal/ConfirmationModal'
import Loading from '../Loading/Loading'
import { ImPencil } from 'react-icons/im'
import EditNameModal from '../Modal/EditNameModal/EditNameModal'
import ActiveOverlay from '../ActiveOverlay/ActiveOverlay'

interface CollectionCardProps {
  id: string
  setChosenCollections?: Dispatch<SetStateAction<string[]>>
  onClick?: () => void
  color?: string
  showUtilities?: boolean
}

const collectionCardStyle = (color: string) => css({
  position: 'relative',
  borderRadius: '0.25rem',
  background: color,
  cursor: 'pointer',
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
  '&:hover': {
    filter: 'brightness(0.6)',
  },
})

const additionalInfoStyle = css({
  zIndex: 2,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem',
  fontSize: '1.25rem',
  fontWeight: 'bold',
})

const utilityContainerStyle = css({
  display: 'flex',
  gap: '1.5rem',
  zIndex: 2,
  '.delete': {
    '&:hover': {
      color: 'darkred',
    },
  },
  '.edit': {
    '&:hover': {
      color: COLORS.yellow,
    },
  },
})

const cardLoadingStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: COLORS['dark-gray'],
  height: 144,
  borderRadius: '0.25rem',
  '> div': {
    top: '0.5rem',
  },
})

export default function CollectionCard({
  id,
  setChosenCollections,
  onClick,
  color = COLORS.black,
  showUtilities = false,
}: CollectionCardProps) {
  const [isClicked, setIsClicked] = useState(false)
  const [collections, setCollections] = useLocalStorage<Collections>(LS_KEY.COLLECTIONS, {})
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showEditNameModal, setShowEditNameModal] = useState<boolean>(false)
  const [chosenCollection, setChosenCollection] = useState<string>('')
  const currentCollection = collections[id]
  const isEmpty = currentCollection.length < 1
  const {
    data,
    error,
    loading,
  } = useQuery<AnimeDetailData, AnimeDetailVars>(ANIME_DETAIL, { variables: { id: currentCollection[0] } })

  const openConfirmationModal = (id: string) => {
    setChosenCollection(id)
    setShowDeleteModal(true)
  }

  const openEditNameModal = (id: string) => {
    setChosenCollection(id)
    setShowEditNameModal(true)
  }

  const handleDelete = () => {
    setCollections(prevState => {
      const copy = { ...prevState }
      delete copy[id]
      return copy
    })
    setChosenCollection('')
    setShowDeleteModal(false)
  }

  const handleClick = () => {
    setIsClicked(!isClicked)
    if (setChosenCollections) {
      isClicked ?
        setChosenCollections(prevState => [...prevState.filter(value => value !== id)])
        :
        setChosenCollections(prevState => [...prevState, id])
    }
  }

  if (loading && !isEmpty) return <Loading wrapperCss={cardLoadingStyle} />
  // TODO: Create Error Component
  if (error && !isEmpty) return <div>{JSON.stringify(error)}</div>

  return (
    <div css={collectionCardStyle(color)} onClick={setChosenCollections ? handleClick : onClick}>
      <ActiveOverlay isVisible={isClicked} />
      <div css={[bgOverlay, imageStyle(color)]}
           style={{ backgroundImage: `url(${data?.Media.bannerImage || data?.Media.coverImage.extraLarge || defaultImage})` }} />
      <div css={additionalInfoStyle}>
        <span>{id} | {currentCollection.length} Anime{currentCollection.length > 1 && 's'}</span>
        {showUtilities && <span css={utilityContainerStyle}>
          <ImPencil className='edit' onClick={event => {
            openEditNameModal(id)
            event.stopPropagation()
          }} />
          <BsFillTrashFill className='delete' onClick={event => {
            openConfirmationModal(id)
            event.stopPropagation()
          }} />
        </span>}
      </div>
      <ConfirmationModal
        isVisible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onCancel={() => setShowDeleteModal(false)}
        onSubmit={handleDelete}
        header='Delete Collection'
      >
        Are you sure you want to delete {chosenCollection}?
      </ConfirmationModal>
      <EditNameModal
        id={chosenCollection}
        onClose={() => setShowEditNameModal(false)}
        isVisible={showEditNameModal}
      />
    </div>
  )
}