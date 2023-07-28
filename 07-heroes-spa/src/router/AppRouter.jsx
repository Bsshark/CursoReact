import { Routes, Route, Navigate } from "react-router-dom"

import { Navbar } from '../ui';

import { HeroesRoutes } from "../heroes/"
import { LoginPage } from "../auth/pages/LoginPage"

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path='login' element={<LoginPage />} />
            <Route path='/*' element={<HeroesRoutes />} />
        </Routes>
    </>
  )
}
