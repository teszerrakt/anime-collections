/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { COLORS, MQ } from '../../styles/Constants'
import { useNavigate } from 'react-router-dom'
import useLocalStorage, { LS_KEY } from '../../hooks/useLocalStorage'
import CollectionCard from '../../components/Collection/CollectionCard'

const CollectionListPageStyle = css({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: 72,
})

const CollectionListStyle = css({
  display: 'grid',
  gap: '1rem',
  [MQ[0]]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  [MQ[2]]: {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  },
})

export default function CollectionListPage() {
  const [collections] = useLocalStorage(LS_KEY.COLLECTIONS, {})
  const navigate = useNavigate()

  return (
    <div css={CollectionListPageStyle}>
      <div css={CollectionListStyle}>
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