import axios from 'axios'
import React, { useState } from 'react'
import { login } from './authContext'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleInput = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        login(formData)
    }
  return (
    <>
    <form onSubmit={handleSubmit} action="">
            <label htmlFor="">Email</label>
            <input type="email" name='email' value={formData.email} onChange={handleInput} />
            <label htmlFor="">Password</label>
            <input type="password" name='password' value={formData.password} onChange={handleInput} />
            <input type="submit" />
    </form>
    </>
    
  )
}

export default Login