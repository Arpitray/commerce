import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import JustIn from './Components/JustIn'

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <>
      <Navbar />
      <JustIn />
    </>
  )
}

export default App
