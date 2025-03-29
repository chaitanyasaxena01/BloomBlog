// eslint-disable-next-line no-unused-vars
import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-block px-6 py-2 duration-200 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn