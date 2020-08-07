import React from 'react'
import {BrowserRouter as Router, Route}      from 'react-router-dom'
import Login from './Login'


function Main() {
    return (
        <div className="main">
            <Router>
                <Route path="/login" exact component={Login}></Route>
            </Router>
        </div>
    )
}

export default Main














