/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react'
import smugAnya from '../../assets/image/anya-smug.png'
import { COLORS } from '../../styles/Constants'

const emptyStyle = css({
  width: 200,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  img: {
    width: 100,
    objectFit: 'contain'
  },
  '.message': {
    padding: '0.25rem',
    textAlign: 'center',
    borderRadius: '0.5rem',
    background: 'white',
    border: `solid 1px ${COLORS.gray}`,
    color: COLORS.black,
    fontWeight: 500
  }
})

interface EmptyProps {
  message: string
  wrapperCss?: SerializedStyles
}

export default function Empty({ message, wrapperCss }: EmptyProps) {
  return (
    <div css={wrapperCss}>
      <div css={emptyStyle}>
        <img src={smugAnya} alt='Smug Anya'/>
        <div className='message'>
          {message}
        </div>
      </div>
    </div>
  )
}