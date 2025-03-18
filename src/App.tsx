import Login from "./pages/Login"
import Home from "./pages/Home"
import { Route, Routes } from "react-router"



function App() {

  return (

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
   
  )
}

export default App



