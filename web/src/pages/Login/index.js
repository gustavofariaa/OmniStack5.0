import React, { useState } from 'react'

import './styles.css'
import logo from '../../assets/logo.svg'

export default route => {
    const [username, setUsername] = useState('')

    function handleInputOnChange(event) {
        setUsername(event.target.value)
    } 

    function handleFormOnSubmit(event) {
        event.preventDefault()

        if (!username) return
        
        localStorage.setItem('@username', username)
        route.history.push('/timeline')
    }

    return (
        <div className='login-container'>
            <img src={logo} alt='logo' />
            <form onSubmit={handleFormOnSubmit}>
                <input 
                value={username}
                onChange={handleInputOnChange}
                placeholder='User' />
                <button type='submit'>LOGIN</button>
            </form>
        </div>
    )
}
