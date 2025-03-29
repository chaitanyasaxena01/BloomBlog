import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div className="flex items-center">
      <div className="bg-primary-600 text-white px-2 py-1 rounded-l-lg">
        <span className="font-display text-2xl font-bold">Bloom</span>
      </div>
      <div className="bg-secondary-700 text-white px-2 py-1 rounded-r-lg">
        <span className="font-display text-2xl font-bold">Blog</span>
      </div>
    </div>
  )
}

export default Logo