import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'

export default function Protected({children, authentication = true}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    const { isLoaded, isSignedIn } = useAuth()

    useEffect(() => {
        // Wait for Clerk to load
        if (!isLoaded) {
            return;
        }
        
        // Check if user should be authenticated
        if (authentication && !isSignedIn) {
            navigate("/login")
        } 
        // Check if user should NOT be authenticated (login/signup pages)
        else if (!authentication && isSignedIn) {
            navigate("/")
        }
        
        setLoader(false)
    }, [isLoaded, isSignedIn, authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}
