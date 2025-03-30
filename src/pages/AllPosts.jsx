import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import databaseService from "../lib/db";

function AllPosts() {
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        databaseService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts)
            }
        })
    }, [])
    
    return (
        <div className='w-full py-8 bg-secondary-50'>
            <Container>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-secondary-800 font-display text-center'>All Articles</h1>
                    <p className='text-center text-secondary-600 mt-2'>Explore all our latest blog posts</p>
                </div>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts