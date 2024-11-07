import React from "react"
// import RiddleComponent from "./Components/RiddleComponent"
import { Route, Routes } from "react-router-dom"

// function App() {
//   return (
//     <>
//     <Routes>
//       <Route path="/" element={<RiddleComponent />}/>
//     </Routes>
// =======
import { useState } from 'react'
import './App.css'
import Home from './components/Home'
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}/>
    </Routes>

    </>
  )
}

export default App
