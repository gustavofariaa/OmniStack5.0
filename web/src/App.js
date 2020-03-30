import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/Login'
import Timeline from './pages/Timeline'

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route exact path='/timeline' component={Timeline}/>
            </Switch>
        </BrowserRouter>
    )
}
