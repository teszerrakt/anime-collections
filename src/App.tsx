/** @jsxImportSource @emotion/react */
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { css } from '@emotion/react'

import AnimeListPage from './pages/AnimeListPage/AnimeListPage'
import AnimeDetailPage from './pages/AnimeDetailPage/AnimeDetailPage'
import CollectionListPage from './pages/CollectionListPage/CollectionListPage'
import CollectionDetailPage from './pages/CollectionDetailPage/CollectionDetailPage'
import Error404Page from './pages/ErrorPage/Error404Page'
import { COLORS } from './styles/Constants'

export default function App() {
  return (
    <div css={css({
      display: 'flex',
      background: COLORS.black,
      color: COLORS.green,
      padding: '1rem',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
    })}>
      <Router>
        <Routes>
          <Route path='/animes' element={<AnimeListPage />} />
          <Route path='/animes/:animedId' element={<AnimeDetailPage />} />
          <Route path='/collections' element={<CollectionListPage />} />
          <Route path='/collections/:collectionId' element={<CollectionDetailPage />} />
          <Route path='/' element={<Navigate to='/animes' />} />
          <Route path='*' element={<Error404Page />} />
        </Routes>
      </Router>
    </div>
  )
}