import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontContext } from './FontContext'

const Navbar = () => {
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/createblog">Create Blog</Link>
    </nav>
  )
}

export default Navbar