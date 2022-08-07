/** @jsxImportSource @emotion/react */
import { AiFillStar } from 'react-icons/ai'
import { COLORS, MQ, bgOverlay } from '../../styles/Constants'
import { css } from '@emotion/react'
import defaultImage from '../../assets/image/default-banner-image-large.png'

const animeBannerStyle = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-end',
  borderTopLeftRadius: '0.5rem',
  borderTopRightRadius: '0.5rem',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: 300,
  '> *': {
    zIndex: 2,
    padding: '1rem',
  },
})

const titleStyle = css({
  marginBottom: '0.5rem',
  '.romaji': {
    fontWeight: 'bold',
    fontSize: '1.5rem'
  },
  '.native': {
    fontWeight: 500,
    fontSize: '1rem'
  },
  [MQ[1]]: {
    '.romaji': {
      fontSize: '2rem'
    },
    '.native': {
      fontSize: '1.25rem'
    },
  }
})

const scoreStyle = css({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  background: COLORS.black,
  color: COLORS.yellow,
  borderRadius: '5rem',
  padding: '0.125rem 0.5rem',
  gap: '0.25rem',
  right: '1rem',
  top: '1rem',
  fontWeight: 500,
  fontSize: '1rem',
  span: {
    position: 'relative',
    bottom: 1
  }
})

interface AnimeHeaderProps {
  bannerImage: string
  title: {
    romaji: string
    native?: string
  }
  score: number
}

export default function AnimeHeader({score, bannerImage, title}: AnimeHeaderProps) {
  const isNativeTitleShown: boolean = !!title.native && title.native !== title.romaji

  return (
    <div css={[animeBannerStyle, bgOverlay]} style={{ backgroundImage: `url(${bannerImage || defaultImage})` }}>
      <div css={titleStyle}>
        <div className='romaji'>
          {title.romaji}
        </div>
        {isNativeTitleShown && <div className='native'>{title.native}</div>}
      </div>
      <div css={scoreStyle}>
        <AiFillStar color={COLORS.yellow}/>
        <span>{score/10}</span>
      </div>
    </div>
  )
}