/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import Button from '../Button/Button'
import { HiPlusCircle } from 'react-icons/hi'
import NewCollectionModal from './NewCollection/NewCollectionModal'

export interface Collections {
  [collectionId: string]: number[]
}

export default function AddToNewCollectionButton() {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <>
      <Button
        Icon={<HiPlusCircle />}
        text='Add to Collection'
        onClick={() => setShowModal(true)}
      />
      <NewCollectionModal isVisible={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}