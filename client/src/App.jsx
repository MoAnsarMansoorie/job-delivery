import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import LogIn from "./pages/LogIn"
import ForgotPassword from "./pages/ForgotPassword"


function App() {

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  )
}

export default App
