/** @jsxImportSource @emotion/react */
import { Link, useLocation } from 'react-router-dom'
import { css } from '@emotion/react'
import { COLORS } from '../../styles/Constants'
import { MdLocalMovies } from 'react-icons/md'
import { BsCollectionPlayFill } from 'react-icons/bs'
import React from 'react'

interface Menu {
  name: string,
  to: string
  Icon?: React.ReactNode
}

interface NavBarProps {
  menus?: Menu[]
}

const DEFAULT_MENU: Menu[] = [
  { name: 'Animes', to: '/animes', Icon: <MdLocalMovies/> },
  { name: 'Collections', to: '/collections', Icon: <BsCollectionPlayFill/> },
]

const navBarStyle = css({
  position: 'fixed',
  bottom: 0,
  display: 'flex',
  width: '100vw',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  background: COLORS['dark-gray'],
  padding: '0.5rem 0',
  zIndex: 2,
  a: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 50,
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    color: COLORS.green,
    fontSize: '0.75rem',
    fontWeight: 500,
    textDecoration: 'none',
    '&:hover,&.active': {
      background: COLORS.black,
    },
    svg: {
      fontSize: '1.25rem',
      marginBottom: '0.25rem'
    }
  },
})

export default function NavBar({ menus = DEFAULT_MENU }: NavBarProps) {
  const { pathname } = useLocation()

  return (
    <nav css={navBarStyle}>
      {menus.map(({ name, to, Icon }) => (
        <Link className={pathname === to ? 'active' : ''} key={name} to={to}>
          {Icon}{name}
        </Link>)
      )}
    </nav>
  )
}