import React, { useEffect, useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { ROUTES } from './routes.js'

import { Nav } from './app/Nav'
import Login from './app/Login'
import useToken from './app/useToken'

import axios from 'axios';

function App() {
  const { token, setToken } = useToken()

  if(!token) return <Login setToken={setToken} />

  return (
    <Router>
      <Nav token={token}/>
      <Switch>
        { ROUTES.map((route, index) => <Route key={index} {...route} />)}
      </Switch>
    </Router>
  )
}

export default App