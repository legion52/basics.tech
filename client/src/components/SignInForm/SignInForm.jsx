import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../../redux/actions/userAC';
import style from './style.module.css'

export default function SignInForm() {
  const [inputs, setInputs] = useState({ email: '', password: '' })
  const [hasError, setHasError] = useState(false)
  const dispatch = useDispatch()
  const inputHandler = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  };
  const navigate = useNavigate()
  const user = useSelector(state => state.user) || 0


  const submitHandler = (e) => {
    e.preventDefault()
    let payload = Object.entries(inputs).filter((el) => el[1] ? el[1].trim() : el[1])

    if (payload.length) {
      dispatch(signInUser(inputs))
      setInputs({ email: '', password: '' })
    }
    if (user.length) {
      navigate('/')
    }
    else {
      setTimeout(()=>{
        setHasError(true)
      }, 1000)
    }
  }
  return (
    <div>
      <form onSubmit={submitHandler} novalidate>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">email</label>
          <input type="text" className="form-control" name='email' onChange={inputHandler} value={inputs.email} required />
          <div className="valid-feedback">
            Looks good!
          </div>
        </div>
        <div className={`mb-3 ${style.err}`}>
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={inputHandler} value={inputs.password} required />
          {hasError && <p>Неправильно указан логин и/или пароль</p>}

        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

