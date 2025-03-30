import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { useAuth, useUser } from '@clerk/clerk-react'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const { isLoaded, userId, sessionId } = useAuth()
  const { user } = useUser()

  useEffect(() => {
    // Wait for Clerk to load
    if (!isLoaded) {
      return;
    }
    
    // Check if user is authenticated with Clerk
    if (userId && user) {
      // User is logged in, update Redux store
      const userData = {
        id: userId,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User',
        email: user.primaryEmailAddress?.emailAddress
      }
      dispatch(login({userData}))
    } else {
      // User is not logged in
      dispatch(logout())
    }
    
    setLoading(false)
  }, [isLoaded, userId, user, dispatch])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gradient-to-b from-secondary-50 to-secondary-100'>
      <div className='w-full block'>
        <Header />
        <main className='min-h-[70vh]'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App