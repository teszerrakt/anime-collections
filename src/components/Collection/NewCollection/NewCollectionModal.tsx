/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import useLocalStorage, { LS_KEY } from '../../../hooks/useLocalStorage'
import Modal from '../../Modal/Modal'
import Button from '../../Button/Button'
import { HiPlusCircle } from 'react-icons/hi'
import { css } from '@emotion/react'
import CollectionCard from '../CollectionCard'
import { Collections } from './NewCollection'
import NewCollectionForm from './NewCollectionForm'
import { useParams } from 'react-router-dom'

interface NewCollectionModalProps {
  isVisible: boolean,
  onClose: () => void
}

export default function NewCollectionModal({ isVisible, onClose }: NewCollectionModalProps) {
  const [chosenCollections, setChosenCollections] = useState<string[]>([])
  const [showForm, setShowForm] = useState(false)
  const [refreshLocalStorage, setRefreshLocalStorage] = useState<boolean>(false)
  const [collections, setCollections] = useLocalStorage<Collections>(LS_KEY.COLLECTIONS, {})
  const params = useParams()

  useEffect(() => {
    const newCollections = window.localStorage.getItem(LS_KEY.COLLECTIONS)
    if (newCollections) {
      setCollections(JSON.parse(newCollections))
    }
  }, [refreshLocalStorage, setCollections])

  const triggerRefreshLocalStorage = () => setRefreshLocalStorage(!refreshLocalStorage)

  const handleSubmit = () => {
    if (params.animeId) {
      const animeId = +params.animeId
      const newCollections = chosenCollections.reduce((obj: Collections, name) => {
        const currentCollection = collections[name].filter(id => id !== animeId)
        obj[name] = [...currentCollection, animeId]
        return obj
      }, {})
      setCollections(prevState => ({...prevState, ...newCollections}))
    }
    
    onClose()
  }

  return (
    <Modal
      isVisible={isVisible}
      header='Add to Collection'
      footer={
        <ModalFooter
          onCancel={onClose}
          onSubmit={handleSubmit}
          disableSubmit={chosenCollections.length === 0}
        />
      }
      onClose={onClose}
    >
      <>
        <Button
          Icon={<HiPlusCircle />}
          text='Create New Collection'
          isFullWidth
          isLarge
          onClick={() => setShowForm(true)}
        />
        {showForm && <NewCollectionForm
          collections={collections}
          onSubmit={() => {
            setShowForm(false)
            triggerRefreshLocalStorage()
          }}
          onCancel={() => setShowForm(false)} />}
        <div
          className='scrollbar'
          css={css({
            marginTop: '1rem',
            maxHeight: 400,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          })}
        >
          {Object.keys(collections).map((key) => {
            return <CollectionCard
              key={key}
              id={key}
              setChosenCollections={setChosenCollections}
            />
          })}
        </div>
      </>
    </Modal>
  )
}

interface ModalFooterProps {
  disableSubmit: boolean
  onCancel: () => void
  onSubmit: () => void
}

const modalFooterStyle = css({
  display: 'flex',
  gap: '1rem',
})

function ModalFooter({ disableSubmit, onSubmit, onCancel }: ModalFooterProps) {
  return (
    <div css={modalFooterStyle}>
      <Button text='Cancel' type='ghost' isFullWidth isLarge onClick={onCancel} />
      <Button disabled={disableSubmit} text='Submit' isFullWidth isLarge onClick={onSubmit} />
    </div>
  )
}