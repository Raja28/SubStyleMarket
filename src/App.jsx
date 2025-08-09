import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import Card from './components/Card'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <HeroSection />
      <Card />
      {/* <Cart /> */}
      
    </>
  )
}

export default App
