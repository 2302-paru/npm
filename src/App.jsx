import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Intro from './components/Intro'
import Auth from './components/Auth'
import Explore from './components/Explore'
import Quiz from './components/Quiz'
import Profile from './pages/Profile'
import Lessons from './pages/Lessons'
import Leaderboard from './pages/Leaderboard'
import Resources from './pages/Resources'
import Login from './components/Login'
import Signup from './components/Signup'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
