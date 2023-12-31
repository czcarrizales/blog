import React, {useContext} from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import AuthContext from '../authContext'

const ProtectedRoutes = () => {
    const {user} = useContext(AuthContext)
    console.log(user)
  return (
            user
            ?
            <Outlet />
            :
            <Navigate to='/login' />
  )
}

export default ProtectedRoutes