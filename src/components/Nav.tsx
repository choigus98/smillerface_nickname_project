import React from 'react'
import styled from 'styled-components/macro'
import Logo from './Logo.png'

const S = {
  NavWrap: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70px;
    img {
      height: 100%;
      margin-top: 10px;
    }
  `,
}

const Nav = (): JSX.Element => {
  return (
    <S.NavWrap>
      <img src={Logo} alt="logo" />
    </S.NavWrap>
  )
}

export default Nav
