import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editUser } from '../../redux/actions/userAC'
import style from './style.module.css'

export default function EditForm({ setEditSt, account }) {
  const upload = useRef()
  const [inputs, setInputs] = useState({id:account._id, name: account.name, password: "", img: {} })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(editUser(inputs))
    navigate('/people')
    setInputs({ name: '', email: '', password: '' })
  }

  const imgHandle = (e) => {
    e.preventDefault();
    const newIncident = {
      avatar: upload.current.files[0],
    };
    setInputs(prev => ({ ...prev, img: newIncident }))
  }

  const inputHandler = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }


  return (
    <div className={style.card}>
      <div>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">Name</label>
            <input type="text" className="form-control" id="exampleInputName" name='name' onChange={inputHandler} value={inputs.name} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={inputHandler} value={inputs.password} />
          </div>
          <div class="mb-3">
            <label class="form-label" htmlFor="inputGroupFile02">avatar</label>
            <input type="file" accept="image/*" ref={upload} class="form-control" id="inputGroupFile02" onChange={imgHandle} />
          </div>
        <button type="submit" className="btn btn-primary">сохранить</button>
        </form>
        <button className='btn btn-secondary my-3' onClick={() => setEditSt(false)}>Отмена</button>
      </div>
    </div>
  )
}

