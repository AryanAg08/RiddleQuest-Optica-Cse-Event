import React, {useEffect} from "react"
import { Route, Routes } from "react-router-dom"
import Home from './components/Home'
import LandingPage from "./components/landing/LandingPage"
import Header from "./components/Header/Header"
function App() {


  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Home" element={<LandingPage />} />
          <Route path="/event" element={<Home />} />
        </Routes>
      </div>

    </>
  )
}

export default App
