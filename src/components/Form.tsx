/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const S = {
  Form: styled.div<{ imageSrc: string }>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid white;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 70vh;
    color: white;
    ${({ imageSrc }) => {
      return imageSrc ? `background-image: url(${imageSrc})` : ''
    }};
    background-size: contain;
    background-repeat: no-repeat;
    resize: both;
  `,
  AddBtn: styled.p`
    position: absolute;
    color: white;
    font-size: 50px;
  `,
  Input: styled.input`
    color: white;
    opacity: 0%;
    z-index: 10;
  `,
  SubmitBtn: styled.button`
    width: 100%;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: white;
    font-family: 'Nerko One';
    font-size: 30px;
    line-height: 2;
  `,
  DescriptionWrap: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid yellow;
    height: 50px;
  `,
  Description: styled.span`
    color: yellow;
  `,
}

const Form = (): JSX.Element => {
  const [image, setImage] = useState<Blob>()
  const [imageSrc, setImageSrc] = useState('')

  const encodeFileToBase64 = (fileBlob: Blob) => {
    const reader = new FileReader()
    reader.readAsDataURL(fileBlob)
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        const previewResult = reader.result as string
        setImageSrc(previewResult)
        resolve()
      }
    })
  }

  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageFile = e.target.files[0]
      setImage(imageFile)
      encodeFileToBase64(imageFile)
    }
  }

  const createFormData = () => {
    const formData = new FormData()
    if (image) {
      formData.append('image', image)
    }
    const option = {
      method: 'post',
      // url: 'https://georgeyamulddak.herokuapp.com/',
      url: 'https://openapi.naver.com/v1/vision/celebrity',
      headers: {
        'X-Naver-Client-Id': 'fcb0zl9r9nENOW9M1vl_',
        'X-Naver-Client-Secret': 'Rg2a_dNj7B',
      },
      data: formData,
    }
    // eslint-disable-next-line no-console
    axios(option)
      // .then(console.log)
      .then((res) => {
        return JSON.stringify(res.data)
      })
      .then((data) => {
        return console.log(data)
      })
  }

  const submitFormData = () => {
    createFormData()
  }
  return (
    <>
      <S.Form onChange={createFormData} imageSrc={imageSrc}>
        <S.Input
          type="file"
          multiple={false}
          onChange={(e) => {
            imageChange(e)
          }}
        />
        {!imageSrc && <S.AddBtn>+</S.AddBtn>}
      </S.Form>
      <S.SubmitBtn type="button" onClick={submitFormData}>
        submit
      </S.SubmitBtn>
      <S.DescriptionWrap>
        <S.Description>
          사진을 등록후 제출해주시면 닉네임을 결과가 나옵니다 !
        </S.Description>
      </S.DescriptionWrap>
    </>
  )
}

export default Form
