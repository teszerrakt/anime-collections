/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import Button from '../Button/Button'
import { HiPlusCircle } from 'react-icons/hi'
import NewCollectionModal from '../Collection/NewCollection/NewCollectionModal'
import { css } from '@emotion/react'

interface AnimeBulkChooseButton {
  isActive: boolean
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
  chosenAnimes: number[]
  setChosenAnimes: React.Dispatch<React.SetStateAction<number []>>
}

const animeBulkChooseButtonStyle = css({
})

export default function AnimeBulkChooseButton({ isActive, setIsActive, chosenAnimes, setChosenAnimes }: AnimeBulkChooseButton) {
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleClick = () => {
    chosenAnimes.length < 1 && setIsActive(!isActive)
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
        text={isActive ? 'Add to Collection' : 'Select Animes'}
        onClick={handleClick}
        isLarge
      />
      <NewCollectionModal isVisible={showModal} onClose={handleCloseModal} chosenAnimes={chosenAnimes}/>
    </div>
  )
}