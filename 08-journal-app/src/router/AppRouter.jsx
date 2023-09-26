import { Route, Routes } from "react-router-dom"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { AuthRoutes } from "../auth/routes/AuthRoutes"

export const AppRouter = () => {
  return (
    <Routes>
        {/* Login y registro */}
        <Route path="/auth/*"   element={ <AuthRoutes/> }/>

        {/* Journal App */}
        <Route path="/*"        element={ <JournalRoutes/> }/>
    </Routes>
  )
}
