import React from 'react'
import html2canvas from 'html2canvas'
import Nav from './components/Nav'
import Form from './components/Form'
import Footer from './components/Footer'

const App = (): JSX.Element => {
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
    <div className="App" id="screenShot">
      <Nav />
      <Form />
      <button onClick={onCapture} type="button">
        ScreenShot
      </button>
      <Footer />
    </div>
  )
}

export default App
