import React from 'react'
import moment from 'moment'
import io from 'socket.io-client'
import api from '../../services/api'

import './styles.css'
import heart from '../../assets/heart.svg'

export default ({ post }) => {
    async function handleLikeOnClik(_id) {
        await api.post('/likes', { _id })

        const socket = io('http://localhost:3333')
        socket.emit('like')
    }

    return (
        <div className='post-container'>
            <div className='header-post-container'>
                <h1>{post.author}</h1>
                <p>{moment(post.createdAt).fromNow()}</p>
            </div>
            <p>{post.content}</p>
            <div className='post-info'>
                <img src={heart} alt='favorite' onClick={() => handleLikeOnClik(post._id)} />
                <p>{post.likes}</p>
            </div>
            <hr/>
        </div>
    )
}
