import React, {createContext, useState, useEffect} from 'react'
import axios from 'axios'

const AuthContext = createContext<unknown>(undefined);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const login = async (credentials) => {
        try {
            const loginUser = await axios.post('http://localhost:5000/login', credentials)
            setUser(loginUser.data.session)
            console.log(loginUser)
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <AuthContext.Provider value={{user, login}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
export {AuthProvider}