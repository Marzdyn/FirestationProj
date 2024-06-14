import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {UserContext} from "../context/UserProvider"

export default function Navbar(props){

  const { logout, token } = useContext(UserContext)

  return (
    <div className="navbar">
      <Link to="/allcalls"><button>All Calls</button></Link>
      <Link to="/calllog"><button>Call Log</button></Link>
      {token && <button onClick={logout}>Logout</button>}
    </div>
  )
}