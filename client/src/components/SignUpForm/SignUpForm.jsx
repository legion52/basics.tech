import React, { useRef } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTodoFromServer } from '../../redux/actions/accountsAC'
import { getUser } from '../../redux/actions/userAC'



export default function SignUpForm() {

  const [inputs, setInputs] = useState({ name: '', email: '', password: '', birthDate: '', gender: 'male', img: {} })
  const dispatch = useDispatch()
  const upload = useRef()
  const inputHandler = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const imgHandle = async (e)=>{
    e.preventDefault();
    const newIncident = {
      avatar: upload.current.files[0],
    };
    setInputs(prev=> ({...prev, img:newIncident}))

  }

  const navigate = useNavigate()


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(getUser(inputs))
    dispatch(getTodoFromServer())
    setTimeout(()=>{
      navigate('/people')
    }, 1000)
    setInputs({ name: '', email: '', password: '' })
  }


  return (
    <div>
      <form onSubmit={submitHandler} novalidate>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">Name</label>
          <input type="text" className="form-control" id="exampleInputName" name='name' onChange={inputHandler} value={inputs.name} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={inputHandler} value={inputs.email} required/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={inputHandler} value={inputs.password} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">date of birth</label>
          <input type="date" className="form-control" id="birthDate" name='birthDate' onChange={inputHandler} required/>
        </div>
        <div class="mb-3">
            <label class="form-label" htmlFor="inputGroupFile02">avatar</label>
          <input type="file" accept="image/*" ref={upload} class="form-control" id="inputGroupFile02" onChange={imgHandle} required/>
        </div>
        <div className="mb-3">
          <input type="radio" className="form-check-input" id="inlineRadioDefault1" name='gender' onChange={inputHandler} value="male" />
          <label className="form-check-label mx-2" htmlFor="inlineRadioDefault1">
            male
          </label>
          <input type="radio" className="form-check-input mx-2" id="inlineRadioDefault2" name='gender' onChange={inputHandler} value="feminine" />
          <label className="form-check-label" htmlFor="inlineRadioDefault2">
            feminine
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
