import React from 'react'
import styled from 'styled-components'

const S = {
  NavWrap: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 55px;
    /* border: 1px solid white; */
    /* border-radius: 10px; */
    font-family: 'Nerko One';
    font-size: 40px;
    color: white;
    background-color: rgba(0, 0, 0, 0.09);
  `,
}

const Nav = (): JSX.Element => {
  return <S.NavWrap>YamulDDak</S.NavWrap>
}

export default Nav
