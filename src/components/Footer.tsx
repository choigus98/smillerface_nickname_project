import React from 'react'
import styled from 'styled-components/macro'
// import FooterAD from './FooterAD.png'

const S = {
  Footer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    width: 100%;
    /* opacity: 40%; */
    img {
      width: 50%;
      height: auto;
      margin-bottom: 10px;
    }
    p {
      color: white;
      font-family: sans-serif;
      font-size: 24px;
      font-weight: 700;
    }
  `,
}
const Footer = () => {
  const clickAds = () => {
    window.open('https://wecode.co.kr/')
  }

  return (
    <S.Footer onClick={clickAds}>
      <p>반박은 인정, 개발은?</p>
      <img
        // eslint-disable-next-line max-len
        src="https://framerusercontent.com/images/ShhqalzMh9fB1tTEQzKLKvHfvI.png"
        alt="footer AD"
      />
    </S.Footer>
  )
}

export default Footer
