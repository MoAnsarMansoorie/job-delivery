import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import LogIn from "./pages/LogIn"


function App() {

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
    </Routes>
  )
}

export default App
