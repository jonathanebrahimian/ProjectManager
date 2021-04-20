import React from 'react';

import Login from './Login';
import Register from './Register';

import { Link, Switch, Route, NavLink} from "react-router-dom";
import { Nav } from './Nav';

function Logreg(){
    return(
        <div className = "Logreg" style = {{textAlign:"center"}}>
            <NavLink  activeClassName = "is-active" to ="/" >Login </NavLink>
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