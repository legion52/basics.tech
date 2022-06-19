import React, { useState } from 'react'
import SignInForm from '../SignInForm/SignInForm'
import SignUpForm from '../SignUpForm/SignUpForm'
import style from './style.module.css'

export default function Auth() {
  const [account, setAccount] = useState(true)
  const clickHandler = () => {
    setAccount(prev => !prev)
  }
  return (
    <div className={style.authForm}>
      <div className={style.radio}>
      <li className={`nav-link active ${account?style.link:''}`} onClick={clickHandler}>Вход</li>
    <li className={`nav-link active ${!account?style.link:''}`} onClick={clickHandler}>Регистрация</li>
      </div>
      {account?<SignInForm/>:<SignUpForm/>}
    </div> 

  )
}

