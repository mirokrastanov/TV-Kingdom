import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.module.css'
import Navbar from './components/core/navbar/Navbar';
import Home from './components/core/home/Home';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />

      <Home />
    </>
  )
}

export default App
