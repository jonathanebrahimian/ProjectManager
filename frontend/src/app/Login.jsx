import React, {useState} from 'react';
import Proptypes from 'prop-types'
import axios from 'axios';
import {Register} from './Register';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

async function loginUser(payload) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/login', JSON.stringify(payload), config)
            .then(x => {
                resolve(x.data)
            })
            .catch(x => reject(x.data))
    })
}

export function Login({ setToken }) {
    // const [details, setDetails] = useState({username:"",password:""});
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    let userID 
    let isLoggedIn = false
    // const submit = (e) => {
    // e.preventDefault();
    // console.log(details);
    // };

    // async function loginUser(payload) {
    //     return new Promise((resolve, reject) => {
    //         axios.post('http://localhost:8000/login', JSON.stringify(payload))
    //             .then(x => resolve(x.data))
    //             .catch(x => reject(x.data))
    //     })
    // }

    const handleSubmit = async e => {
        e.preventDefault()
        const token = await loginUser({
            username,
            password
        })
        setToken(token.result.userID)
        userID = token.result.userID

        window.location.href = '/home/' + userID
    }

    const buttonStyle ={
    display: "inline-block",
    padding: "10px 15px",
    borderRadius: "8px",
    backgroundImage: "linear-gradient(to right, #FFCE00 50%, #FFCE00 50%, #FE4800",
    backgroundSize: "200%",
    backgroundPosition: "0%",
    transition: "0.4s",
    color: "black",
    fontWeight: "700",
    cursor: "pointer"
    };
    const pageStyle ={
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#535651",
    }
    const loginbox ={
        position: "relative",
        display: "block",
        backgroundColor: "#FFF",
        padding: "30px",
        zIndex: "2"
    }
    return(
        <form onSubmit = {handleSubmit} style = {pageStyle}>
            <div className = "form-inner" style = {loginbox}>
                <h2>
                    Login
                </h2>
                <div className = "form-group" style = {{textAlign:"center", paddingBottom:"10px"}}>
                    <label htmlFor = "username">Username: </label>
                    <input type = "text" username = "username" id = "username" onChange={e => setUserName(e.target.value)} value={username} placeholder="Enter username"/>
                </div>
                <div className = "form-group" style = {{textAlign:"center", paddingBottom:"10px"}}>
                    <label htmlFor = "password">Password: </label>
                    <input type = "password" password = "password" id = "password"onChange={e => setPassword(e.target.value)} value={password}placeholder="Enter password"/>
                </div>
                <input type = "submit" style = {buttonStyle} value="Login" />
            </div>
        </form>
    )
}

export default Login

Login.propTypes = {
    setToken: Proptypes.func.isRequired
}