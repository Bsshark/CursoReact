import { Routes, Route, Navigate } from "react-router-dom"

import { Navbar } from '../ui';

import { MarvelPage, DcPage } from "../heroes/"
import { LoginPage } from "../auth/pages/LoginPage"

export const AppRouter = () => {
  return (
    <>
      <Navbar />
        <Routes>
            <Route path='marvel' element={<MarvelPage />} />
            <Route path='dc' element={<DcPage />} />
            <Route path='login' element={<LoginPage />} />

            <Route path='/' element={<Navigate to='/marvel'/>} />
        </Routes>
    </>
  )
}
