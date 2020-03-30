import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import api from '../../services/api'

import NewPost from '../../components/NewPost'
import Post from '../../components/Post'

import './styles.css'
import logo from '../../assets/logo.svg'

export default function Timeline(route) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        (async () => {
            await retrievePosts()
            const socket = io('http://localhost:3333')
            socket.on('updatePosts', () => retrievePosts())
        })()
    }, [])

    async function retrievePosts() {
        const { data } = await api.get('/posts')
        setPosts(data)
    }

    function handleLogoOnClick() {
        route.history.push('/')
    }

    return (
        <div className='timeline-container'>
            <img onClick={handleLogoOnClick} src={logo} alt='logo' />
            <NewPost />
            {posts.map((post, index) => <Post key={index} post={post} /> )}
        </div>
    )
}
