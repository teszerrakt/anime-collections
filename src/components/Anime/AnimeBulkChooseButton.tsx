/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import Button from '../Button/Button'
import { HiPlusCircle } from 'react-icons/hi'
import NewCollectionModal from '../Collection/NewCollection/NewCollectionModal'
import { css } from '@emotion/react'

interface AnimeBulkChooseButtonProps {
  isActive: boolean
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
  chosenAnimes: number[]
  setChosenAnimes: React.Dispatch<React.SetStateAction<number []>>
}

const animeBulkChooseButtonStyle = css({
})

export default function AnimeBulkChooseButton({ isActive, setIsActive, chosenAnimes, setChosenAnimes }: AnimeBulkChooseButtonProps) {
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleClick = () => {
    setIsActive(!isActive)
    if (isActive) {
        setShowModal(true)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setIsActive(false)
    setChosenAnimes([])
  }

  return (
    <div css={animeBulkChooseButtonStyle}>
      <Button
        Icon={<HiPlusCircle />}
        text={isActive ? 'Proceed' : 'Bulk Add to Collection'}
        onClick={handleClick}
        isLarge
        disabled={isActive && chosenAnimes.length < 1}
      />
      <NewCollectionModal isVisible={showModal} onClose={handleCloseModal} chosenAnimes={chosenAnimes}/>
    </div>
  )
}