/** @jsxImportSource @emotion/react */
import React from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { css } from '@emotion/react'

import AnimeListPage from './pages/AnimeListPage/AnimeListPage'
import AnimeDetailPage from './pages/AnimeDetailPage/AnimeDetailPage'
import CollectionListPage from './pages/CollectionListPage/CollectionListPage'
import CollectionDetailPage from './pages/CollectionDetailPage/CollectionDetailPage'
import Error404Page from './pages/ErrorPage/Error404Page'
import { COLORS } from './styles/Constants'
import NavBar from './components/NavBar/NavBar'

export default function App() {
  return (
    <div css={css({
      background: COLORS.black,
      color: COLORS.green,
      padding: '1rem',
      height: '100%',
    })}>
      <Router>
        <NavBar />
        <div css={css({
        })}>
          <Routes>
            <Route path='/animes' element={<AnimeListPage />} />
            <Route path='/animes/:animeId' element={<AnimeDetailPage />} />
            <Route path='/collections' element={<CollectionListPage />} />
            <Route path='/collections/:collectionId' element={<CollectionDetailPage />} />
            <Route path='/' element={<Navigate to='/animes' />} />
            <Route path='*' element={<Error404Page />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}