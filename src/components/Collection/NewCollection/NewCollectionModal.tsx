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

interface NewCollectionModalProps {
  isVisible: boolean,
  onClose: () => void
}

export default function NewCollectionModal({ isVisible, onClose }: NewCollectionModalProps) {
  const [showForm, setShowForm] = useState(false)
  const [refreshLocalStorage, setRefreshLocalStorage] = useState<boolean>(false)
  const [collections, setCollections] = useLocalStorage<Collections>(LS_KEY.COLLECTIONS, {})

  useEffect(() => {
    const newCollections = window.localStorage.getItem(LS_KEY.COLLECTIONS)
    if (newCollections) {
      setCollections(JSON.parse(newCollections))
    }
  }, [refreshLocalStorage])

  return (
    <Modal isVisible={isVisible} header='Add to Collection' onClose={onClose}>
      <>
        <Button Icon={<HiPlusCircle />} text='Create New Collection' isFullWidth isLarge onClick={() => setShowForm(true)} />
        {showForm && <NewCollectionForm
          collections={collections}
          onSubmit={() => {
            setShowForm(false)
            setRefreshLocalStorage(!refreshLocalStorage)
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
            return <CollectionCard key={key} id={key} />
          })}
        </div>
      </>
    </Modal>
  )
}