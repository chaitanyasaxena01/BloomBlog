import React from 'react'
import storageService from "../lib/storage"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]'>
            <div className='w-full justify-center mb-4 overflow-hidden rounded-xl'>
                <img 
                  src={storageService.getFilePreview(featuredImage)} 
                  alt={title}
                  className='rounded-xl w-full h-48 object-cover hover:scale-105 transition-transform duration-300' 
                />
            </div>
            <h2 className='text-xl font-bold text-secondary-800 mt-2 line-clamp-2'>{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard