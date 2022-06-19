import axios from "axios"
import { SET_USER } from "../types/types"

export const setUser = (value) => {
  return {
    type: SET_USER,
    payload: value
  }

}

export const getUser = (input) => async (dispatch) => {
  const formData = new FormData()
  formData.append('name', input.name)
  formData.append('email', input.email)
  formData.append('password', input.password)
  formData.append('birthDate', input.birthDate)
  formData.append('gender', input.gender)
  formData.append('image', input.img.avatar)
  const res = await axios.post('/api/v1/auth/signup', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  dispatch(setUser(res.data.user))
}

export const editUser = (input) => async (dispatch) => {
  const formData = new FormData()
  formData.append('name', input.name)
  formData.append('id', input.id)
  formData.append('password', input.password)
  formData.append('image', input.img.avatar)
  const res = await axios.post('/api/v1/auth/edit', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  dispatch(setUser(res.data.user))
}

export const signInUser = ( input ) => async ( dispatch ) => {
  const res = await axios.post('/api/v1/auth/signin', input)
  dispatch(setUser(res.data.user))
}

export const userLogout = () => async (dispatch) => {
  await axios.post('/api/v1/auth/logout')
  dispatch(setUser(null))
}

export const checkUser = () => async (dispatch) => {

  try {
    const res = await axios.post('/api/v1/auth/check')
    dispatch(setUser(res.data.user))
    
  } catch (error) {

    dispatch(setUser(null))
    
  }
}
