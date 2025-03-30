import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import {useForm} from "react-hook-form"
import { useSignIn } from '@clerk/clerk-react'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    const { isLoaded, signIn, setActive } = useSignIn()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const login = async(data) => {
        if (!isLoaded) {
            return;
        }
        
        setError("")
        setIsSubmitting(true)
        
        try {
            // Start the sign in process using Clerk
            const result = await signIn.create({
                identifier: data.email,
                password: data.password,
            })
            
            // Set the user session as active
            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId })
                
                // Update Redux store with user data
                const userData = {
                    id: result.createdUserId,
                    email: data.email,
                    name: "User" // Clerk doesn't return name in signIn, we could fetch it separately
                }
                
                dispatch(authLogin({userData}))
                navigate("/dashboard")
            } else {
                // Handle incomplete authentication (e.g., 2FA required)
                setError("Authentication incomplete. Please complete all required steps.")
            }
        } catch (error) {
            setError(error.message || "An error occurred during login")
        } finally {
            setIsSubmitting(false)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login