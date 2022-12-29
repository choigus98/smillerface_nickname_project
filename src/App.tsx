import React from 'react'
import html2canvas from 'html2canvas'
import styled from 'styled-components/macro'
import { useRecoilValue } from 'recoil'
import Form from './components/Form'
import Footer from './components/Footer'
import Logo from './components/Logo.png'
import { captureAtom } from './recoil/store'

const S = {
  Div: styled.div`
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
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
  Button: styled.button`
    width: 100%;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: white;
    font-family: 'Nerko One';
    font-size: 30px;
    line-height: 2;
  `,
}

const App = (): JSX.Element => {
  const isCaptureOn = useRecoilValue(captureAtom)

  const onSaveAs = (uri: string, filename: string) => {
    const link = document.createElement('a')
    document.body.appendChild(link)
    link.href = uri
    link.download = filename
    link.click()
    document.body.removeChild(link)
  }
  const onCapture = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const screenShot = document.getElementById('screenShot')!
    html2canvas(screenShot).then((canvas) => {
      onSaveAs(canvas.toDataURL('image/png'), 'image-download.png')
    })
  }

  return (
    <S.Div className="App" id="screenShot">
      <S.NavWrap>
        <img src={Logo} alt="logo" />
      </S.NavWrap>
      <Form />
      {isCaptureOn && (
        <S.Button onClick={onCapture} type="button">
          Capture
        </S.Button>
      )}
      <Footer />
    </S.Div>
  )
}

export default App
