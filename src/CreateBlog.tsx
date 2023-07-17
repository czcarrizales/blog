import axios from 'axios'
import React, { useState } from 'react'


const CreateBlog = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
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
            const createBlogPost = await axios.post('http://localhost:5000/blog', formData)
            console.log(createBlogPost)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
    <form onSubmit={handleSubmit} action="">
            <label htmlFor="">Title</label>
            <input type="text" name='title' value={formData.title} onChange={handleInput} />
            <label htmlFor="">Content</label>
            <textarea name='content' value={formData.content} onChange={handleInput} />
            <input type="submit" />
    </form>
    </>
    
  )
}

export default CreateBlog