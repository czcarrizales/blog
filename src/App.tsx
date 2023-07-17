import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Navbar from './Navbar'
import './App.css'
import CreateBlog from './CreateBlog'
import ProtectedRoutes from './utils/ProtectedRoute'
import {AuthProvider} from './authContext'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='createblog' element={<CreateBlog />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
