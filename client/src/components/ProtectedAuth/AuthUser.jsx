import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom'
import style from './style.module.css'

const AuthUser = ({ children }) => {
    const user = useSelector(state => state.user)
    let location = useLocation()

    if(user){
      return <Navigate to="/people" state={{ from: location }} replace />
    }
    return (
      <div className={style.wrapper}>
        {children}
      </div>
      )
}

export default AuthUser
