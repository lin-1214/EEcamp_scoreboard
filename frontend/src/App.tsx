import { useState, useEffect } from 'react'
import './App.css'
import { useData } from './hooks/useData'
import { Header } from './components/header.tsx'
import { Footer } from './components/footer.tsx'
import { Content } from './components/content.tsx'
import instance from "../hooks/api";

function App() {
  // const { start, setStart } = useData();

  return (
    <div className="Wrapper">
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default App
