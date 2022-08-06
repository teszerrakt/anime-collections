/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import { COLORS } from '../../styles/Constants'

interface DetailCardProps {
  header: React.ReactNode,
  children?: React.ReactNode
}

const detailCardStyle = css({
  padding: '1rem',
  background: COLORS['dark-gray'],
  borderRadius: '0.5rem',
  '.header': {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    paddingBottom: '0.5rem',
    marginBottom: '0.5rem',
    borderBottom: `solid 1px ${COLORS.green}`
  },
  '.content': {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1rem',
    rowGap: '0.5rem',
  }
})

export default function DetailCard({children, header}: DetailCardProps) {
  return (
    <div css={detailCardStyle}>
      <div className='header'>{header}</div>
      <div className='content'>{children}</div>
    </div>
  )
}

interface DetailInfoProps {
  label: string,
  children?: React.ReactNode
}

const detailInfoStyle = css({
  display: 'grid',
  gridTemplateColumns: '100px auto',
  '.label': {
    fontWeight: 'bold',
  }
})

export function DetailInfo({label, children}: DetailInfoProps) {
  return (
    <div css={detailInfoStyle}>
      <div className='label'>{label}</div>
      <div className='value'>{children}</div>
    </div>
  )
}