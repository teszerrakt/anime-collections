/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { COLORS, MQ } from '../../styles/Constants'
import { useNavigate } from 'react-router-dom'
import useLocalStorage, { LS_KEY } from '../../hooks/useLocalStorage'
import CollectionCard from '../../components/Collection/CollectionCard'
import Button from '../../components/Button/Button'
import { HiPlusCircle } from 'react-icons/hi'
import NewCollectionForm from '../../components/Collection/NewCollection/NewCollectionForm'
import { useState } from 'react'

const collectionListPageStyle = css({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: 72,
})

const collectionListStyle = css({
  display: 'grid',
  gap: '1rem',
  [MQ[0]]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  [MQ[2]]: {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  },
})

const formContainerStyle = css({
  display: 'flex',
  margin: '0 auto',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  marginBottom: '1rem',
  [MQ[0]]: {
    width: 600
  }
})

const emptyStyle = css({
  justifyContent: 'flex-start',
  marginTop: 100,
  height: '100vh',
  '> span': {
    textAlign: 'center',
    fontSize: '1.75rem',
    marginBottom: '1rem'
  }
})

export default function CollectionListPage() {
  const [collections] = useLocalStorage(LS_KEY.COLLECTIONS, {})
  const [showForm, setShowForm] = useState<boolean>(false)
  const isEmpty = Object.keys(collections).length < 1
  const navigate = useNavigate()

  return (
    <div css={collectionListPageStyle}>
      <div css={[formContainerStyle, isEmpty && emptyStyle]}>
        {isEmpty && <span>You don't have any collection.</span>}
        <Button
          Icon={<HiPlusCircle />}
          text='Create New Collection'
          isFullWidth
          isLarge
          onClick={() => setShowForm(!showForm)}
        />
        {showForm &&
          <NewCollectionForm
            collections={collections}
            color={COLORS['dark-gray']}
            inputColor={COLORS.black}
            onSubmit={() => setShowForm(false)}
            onCancel={() => setShowForm(false)}
          />
        }
      </div>
      <div css={collectionListStyle}>
        {Object.keys(collections).map((key) => {
          return <CollectionCard
            key={key}
            id={key}
            onClick={() => navigate(`/collections/${key}`)}
            color={COLORS['dark-gray']}
            showUtilities
          />
        })}
      </div>
    </div>
  )
}