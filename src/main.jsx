import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout } from './components/index.js'
import { ClerkProvider } from '@clerk/clerk-react'
import conf from './conf/conf.js'

import AddPost from "./pages/AddPost.jsx"
import AllPosts from "./pages/AllPosts.jsx"
import EditPost from "./pages/EditPost.jsx"
import Login from './pages/Login.jsx'
import Post from "./pages/Post.jsx"
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/signup/verify-email-address",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/login/factor-one",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
        {
            path: "/dashboard",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Dashboard />
                </AuthLayout>
            ),
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={conf.clerkPublishableKey}>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </ClerkProvider>
  </React.StrictMode>,
)