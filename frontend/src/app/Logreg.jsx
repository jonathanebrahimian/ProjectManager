import React from 'react';

import Login from './Login';
import Register from './Register';

import { Link, Switch, Route, NavLink} from "react-router-dom";

function Logreg(){
    return(
        <div className = "Logreg">
            <h2>Construction Manager</h2>
            <Link exact to ="/" >Login </Link>
            <NavLink  activeClassName = "is-active" to = "/register">Register</NavLink>

        <hr />

        <Switch>
            <Route exact path="/" component ={Login}/>
            <Route path = "/register" component ={Register}/>
        </Switch>
        </div>
    )
}

export default Logreg;