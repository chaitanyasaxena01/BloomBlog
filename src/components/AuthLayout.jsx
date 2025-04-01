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
        if (!isLoaded) {
            setLoader(true)
            return
        }

        const checkAuth = async () => {
            try {
                if (authentication && !isSignedIn) {
                    navigate("/login")
                } else if (!authentication && isSignedIn) {
                    navigate("/")
                }
            } catch (error) {
                console.error('Authentication error:', error)
            } finally {
                setLoader(false)
            }
        }

        checkAuth()
    }, [isLoaded, isSignedIn, authStatus, navigate, authentication])

    if (!isLoaded || loader) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return <>{children}</>
}
