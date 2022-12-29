/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react'
import styled from 'styled-components/macro'
import axios from 'axios'
import { useSetRecoilState } from 'recoil'
import imageCompression from 'browser-image-compression'
import { captureAtom } from '../recoil/store'

const S = {
  Form: styled.div<{ imageSrc: string }>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ imageSrc }) => {
      return imageSrc ? '' : 'border: 1px solid white'
    }};

    border-radius: 5px;
    margin: 10px 40px 10px 40px;
    height: 55vh;
    color: white;
    ${({ imageSrc }) => {
      return imageSrc ? `background-image: url(${imageSrc})` : ''
    }};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
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
  Result: styled.div`
    color: white;
    width: 100%;
    text-align: center;
    font-family: 'Nerko One';
    font-size: 30px;
    margin-top: 10px;
  `,
}

interface ResultInfo {
  faces: {
    celebrity: {
      value: string | null
      confidence: number | null
    }
  }[]
  info: object | undefined
}

const Form = (): JSX.Element => {
  const [image, setImage] = useState<Blob>()
  const [imageSrc, setImageSrc] = useState('')
  const [result, setResult] = useState<ResultInfo | null>()
  const setIsCapture = useSetRecoilState(captureAtom)

  // const encodeFileToBase64 = (fileBlob: Blob) => {
  //   const reader = new FileReader()
  //   reader.readAsDataURL(fileBlob)
  //   return new Promise<void>((resolve) => {
  //     reader.onload = () => {
  //       const previewResult = reader.result as string
  //       setImageSrc(previewResult)
  //       resolve()
  //     }
  //   })
  // }

  const imageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageFile = e.target.files[0]
      const options = {
        maxWidthOrHeight: 1024,
      }
      try {
        const compressedFile = await imageCompression(imageFile, options)
        setImage(compressedFile)

        const promise = imageCompression.getDataUrlFromFile(compressedFile)
        promise.then((urldata) => {
          setImageSrc(urldata)
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
      // encodeFileToBase64(imageFile)
    }
  }

  const createFormData = () => {
    const formData = new FormData()
    const option = {
      method: 'post',
      url: 'https://georgeyamulddak.herokuapp.com/',
      data: formData,
    }
    if (image) {
      formData.append('image', image)
      axios(option).then((res) => {
        JSON.stringify(res.data)
        setResult(res.data)
        setIsCapture(true)
      })
    }
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
      {imageSrc && !result && (
        <S.SubmitBtn type="button" onClick={submitFormData}>
          submit
        </S.SubmitBtn>
      )}
      {!result && (
        <S.DescriptionWrap>
          <S.Description>
            사진을 등록후 제출해주시면 닉네임을 만들어 드립니다 !
          </S.Description>
        </S.DescriptionWrap>
      )}
      {result ? (
        <>
          <S.Result>{result?.faces[0].celebrity.value}</S.Result>
          <S.Result>
            {Math.round(Number(result?.faces[0].celebrity.confidence) * 100)}%
          </S.Result>
        </>
      ) : (
        <S.Result>나의 닉네임은 무엇일까??</S.Result>
      )}
    </>
  )
}

export default Form
