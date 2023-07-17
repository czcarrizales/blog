import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
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
        try {
            const registerUser = await axios.post('http://localhost:5000/register', formData)
            console.log(registerUser)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit} action="">
            <label htmlFor="">Name</label>
            <input type="text" name='name' value={formData.name} onChange={handleInput} />
            <label htmlFor="">Email</label>
            <input type="email" name='email' value={formData.email} onChange={handleInput} />
            <label htmlFor="">Password</label>
            <input type="password" name='password' value={formData.password} onChange={handleInput} />
            <input type="submit" />
        </form>
    </div>
  )
}

export default Register