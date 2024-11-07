import React from "react"
import RiddleComponent from "./Components/RiddleComponent"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<RiddleComponent />}/>
    </Routes>
    </>
  )
}

export default App
