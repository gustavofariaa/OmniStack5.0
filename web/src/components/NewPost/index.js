import React, { useState } from 'react'
import io from 'socket.io-client'
import api from '../../services/api'

import './styles.css'

export default () => {
    const [newPost, setNewPost] = useState('')
    const [countCharacter, setCountCharacter] = useState(0)
    
    function handleTextareaOnChange(event) {
        const { value } = event.target

        if (value.length > 256) return
        setNewPost(value)
        setCountCharacter(value.length)
    }

    function handleNewPost(event) {
        if (!newPost && event.keyCode === 13)
            return event.preventDefault()

        if (newPost && event.ctrlKey && event.keyCode === 13)
            return handleSubmit(event)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (!newPost) return
        
        const author = localStorage.getItem('@username')

        const data = { author, content: newPost }
        await api.post('/posts', { data })

        const socket = io('http://localhost:3333')
        socket.emit('post')

        setNewPost('')
        setCountCharacter(0)
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea 
            value={newPost}
            onChange={handleTextareaOnChange}
            onKeyDown={handleNewPost}
            placeholder={'What\'s happening?'}
            />
            <div className='new-post-info-container'>
                {
                    countCharacter !== 256 
                    ? <p>{countCharacter}/256</p>
                    : <p><b>{countCharacter}/256</b></p>
                }
                <button type='submit'>Post</button>
            </div>
        </form>
    )
}
