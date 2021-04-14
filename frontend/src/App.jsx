import React, { useEffect, useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { ROUTES } from './routes.js'

import axios from 'axios';

function App() {
  return (
    <Router>
      <Switch>
        { ROUTES.map((route, index) => <Route key={index} {...route} />)}
      </Switch>
    </Router>
  )
}

export default App