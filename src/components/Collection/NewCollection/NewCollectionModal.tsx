/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import useLocalStorage, { LS_KEY } from '../../../hooks/useLocalStorage'
import Modal from '../../Modal/Modal'
import Button from '../../Button/Button'
import { HiPlusCircle } from 'react-icons/hi'
import { css } from '@emotion/react'
import CollectionCard from '../CollectionCard'
import { Collections } from '../AddToCollectionButton'
import NewCollectionForm from './NewCollectionForm'
import { useParams } from 'react-router-dom'
import { COLORS } from '../../../styles/Constants'
import Empty from '../../Empty/Empty'

interface NewCollectionModalProps {
  isVisible: boolean,
  onClose: () => void
  chosenAnimes?: number[]
}

export default function NewCollectionModal({ isVisible, onClose, chosenAnimes }: NewCollectionModalProps) {
  const [chosenCollections, setChosenCollections] = useState<string[]>([])
  const [showForm, setShowForm] = useState(false)
  const [collections, setCollections] = useLocalStorage<Collections>(LS_KEY.COLLECTIONS, {})
  const isEmpty = Object.keys(collections).length < 1
  const params = useParams()

  const handleSubmit = () => {
    const newAnime = params.animeId ? [+params.animeId] : chosenAnimes ? chosenAnimes : []
    const newCollections = chosenCollections.reduce((obj: Collections, name) => {
      const currentCollection = collections[name]
      // eslint-disable-next-line eqeqeq
      obj[name] = [...currentCollection, ...newAnime].filter((x, i, a) => a.indexOf(x) == i)
      return obj
    }, {})
    setCollections(prevState => ({ ...prevState, ...newCollections }))
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
          onClick={() => setShowForm(!showForm)}
        />
        {showForm && <NewCollectionForm
          chosenAnimes={chosenAnimes}
          onSubmit={() => setShowForm(false)}
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
            textAlign: 'center',
          })}
        >
          {!isEmpty ? Object.keys(collections).map((key) => {
              return <CollectionCard
                key={key}
                id={key}
                color={COLORS.black}
                setChosenCollections={setChosenCollections}
              />
            })
            :
            !showForm && <Empty
              wrapperCss={css({
                display: 'flex',
                justifyContent: 'center',
              })}
              message={`You don't have any collection.`}
            />
          }
        </div>
      </>
    </Modal>
  )
}

interface ModalFooterProps {
  disableSubmit?: boolean
  onCancel?: () => void
  onSubmit?: () => void
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