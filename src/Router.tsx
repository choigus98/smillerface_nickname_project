import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FaceToNickName from './pages/FaceToNickName'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/facenickname" element={<FaceToNickName />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
