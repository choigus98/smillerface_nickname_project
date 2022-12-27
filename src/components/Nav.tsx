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
      filter: invert(100);
    }
  `,
}

const Nav = (): JSX.Element => {
  return (
    <S.NavWrap>
      {/* <p className="Face">F</p>ace<p className="To">T</p>o
      <p className="NickName">N</p>ickName */}
      <img src={Logo} alt="logo" />
    </S.NavWrap>
  )
}

export default Nav
