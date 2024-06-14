import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Auth from './components/Auth.jsx'
import Calllog from './components/Calllog.jsx'
import Allcalls from "./components/Allcalls.jsx"
import { UserContext } from './context/UserProvider.jsx'

export default function App(){
  const { token, logout } = useContext(UserContext)
  return (
    <div className="app">
      <Navbar logout={logout}/>
      <Routes>
        <Route 
          path="/" 
          element={ token ? <Navigate to="/calllog"/> : <Auth />}
        />
        <Route 
          path="/calllog"
          element={!token ? <Navigate to="/" /> : <Calllog />}
        />
        <Route 
          path="/allcalls"
          element={!token ? <Navigate to="/" /> : <Allcalls />}
        />
      </Routes>
    </div>
  )
}
