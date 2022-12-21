import React from 'react'
import styled from 'styled-components'

const S = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  Title: styled.span`
    font-size: 20px;
  `,
}

const FaceToNickName = () => {
  return (
    <S.Wrap>
      <S.Title>Face To Nickname</S.Title>
    </S.Wrap>
  )
}

export default FaceToNickName
