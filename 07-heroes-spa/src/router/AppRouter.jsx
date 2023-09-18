import { Routes, Route, Navigate } from "react-router-dom"

import { Navbar } from '../ui';

import { HeroesRoutes } from "../heroes/"
import { LoginPage } from "../auth/pages/LoginPage"
import { PrivateRoute } from "./PrivateRoute";
import { Publicroute } from "./PublicRoute";

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path='login' element= {
              <Publicroute>
                <LoginPage />
              </Publicroute>
            } />
            
            <Route path="/*" element={
              <PrivateRoute>
                <HeroesRoutes />
              </PrivateRoute>
            } />
        </Routes>
    </>
  )
}
