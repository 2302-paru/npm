import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Index from './pages/Index'
import Profile from './pages/Profile'
import Lessons from './pages/Lessons'
import Leaderboard from './pages/Leaderboard'
import Resources from './pages/Resources'

const App = () => {
  return (
    <>
    <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
          <Footer />
        </BrowserRouter>
    </>
  )
}

export default App
