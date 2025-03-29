import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Container from '../components/container/Container'

function Dashboard() {
  const userData = useSelector(state => state.auth.userData)

  return (
    <div className="py-8">
      <Container>
        <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">User Dashboard</h1>
          
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Welcome, {userData?.name || 'User'}!</h2>
            <p className="text-gray-600">Email: {userData?.email || 'Not available'}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-md shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Your Posts</h3>
              <p className="text-gray-600 mb-4">Manage your blog posts</p>
              <a href="/all-posts" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                View All Posts
              </a>
            </div>
            
            <div className="bg-green-50 p-6 rounded-md shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Create New Post</h3>
              <p className="text-gray-600 mb-4">Share your thoughts with the world</p>
              <a href="/add-post" className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                Create Post
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Dashboard