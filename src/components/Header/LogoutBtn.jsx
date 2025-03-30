import React from 'react'
import {useDispatch} from 'react-redux'
import {logout} from '../../store/authSlice'
import { useClerk } from '@clerk/clerk-react'

function LogoutBtn() {
    const dispatch = useDispatch()
    const { signOut } = useClerk()
    
    const logoutHandler = async () => {
        try {
            // Sign out from Clerk
            await signOut()
            // Update Redux state
            dispatch(logout())
        } catch (error) {
            console.error("Error signing out:", error)
        }
    }
    
    return (
        <button
        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn