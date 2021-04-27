import React, { useState } from "react";
import Proptypes from 'prop-types'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {users} from '../models/users';
import {testApi} from '../api/testApi';
const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

async function registerUser(payload) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/register', payload, config)
            .then(x => {
                resolve(x.data)
            })
            .catch(x => reject(x.data))
    })
}

export function Register(){
    const [usertype, setUserType] = useState()
    const [userDescription, setUserDescription] = useState()
    const [companyName, setCompanyName] = useState()
    const [materialSupplied, setMaterialSupplied] = useState()
    const [firstName, setFirstName]= useState()
    const [lastName, setLastName]= useState()
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [siteID, setSiteID]= useState()
    const [email, setEmail] = useState()

      const submit = async e => {
        e.preventDefault();
        registerUser(new users(usertype,userDescription,companyName,materialSupplied,firstName,lastName,userName,password,siteID,email));
      };

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
            alignItems: "left",
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
        <form onSubmit = {submit} style = {pageStyle}>
            <div className = "form-inner" style = {loginbox}>
                <h2>
                    Register
                </h2>
                <div className = "form-group" style = {{textAlign:"center", paddingBottom:"10px"}}>
                    <label htmlFor = "username">Username:</label>
                    <input type = "text" username = "username" id = "username" onChange={e => setUserName(e.target.value)} value={userName} placeholder="Enter username"/>
                </div>
                <div className = "form-group" style = {{textAlign:"center", paddingBottom:"10px"}}>
                    <label htmlFor = "password">Password: </label>
                    <input type = "text" password = "password" id = "password"onChange={e => setPassword(e.target.value)} value={password}placeholder="Enter password"/>
                </div>
                <div class="col-4" style = {{textAlign:"center", paddingBottom:"10px"}}>
                    <label for = "ratingSelect">User Type: </label>
                    <select name = "usertype" id ="usertype" className = "form-control" onChange={e => setUserType(e.target.value)} value={usertype}>
                    <option value = "0"></option>
                        <option value = "manager">Manager</option>
                        <option value = "supplier">Supplier</option>
                    </select>
                </div>
                <div className = "form-group" style = {{textAlign:"center", paddingBottom:"10px"}}>
                    <label htmlFor = "firstName">First Name: </label>
                    <input type = "text" firstName = "firstName" id = "firstName"onChange={e => setFirstName(e.target.value)} value={firstName}placeholder="Enter First Name"/>
                </div>
                <div className = "form-group" style = {{textAlign:"center", paddingBottom:"10px"}}>
                    <label htmlFor = "lastName">Last Name: </label>
                    <input type = "text" lastName = "lastName" id = "lastName"onChange={e => setLastName(e.target.value)} value={lastName}placeholder="Enter Last Name"/>
                </div>
                <div className = "form-group" style = {{textAlign:"center", paddingBottom:"10px"}}>
                    <label htmlFor = "companyName">Company Name: </label>
                    <input type = "text" firstName = "companyName" id = "companyName"onChange={e => setCompanyName(e.target.value)} value={companyName}placeholder="Enter Company Name"/>
                </div>
                <div className = "form-group" style = {{textAlign:"center", paddingBottom:"10px"}}>
                    <label htmlFor = "userDescription">User Description: </label>
                    <input type = "text" userDescription = "userDescription" id = "userDescription"onChange={e => setUserDescription(e.target.value)} value={userDescription}placeholder="Enter description"/>
                </div>
                <div className = "form-group" style = {{textAlign:"center", paddingBottom:"10px"}}>
                    <label htmlFor = "materialSupplied">Material(s): </label>
                    <input type = "text" materialSupplied = "materialSupplied" id = "materialSupplied"onChange={e => setMaterialSupplied(e.target.value)} value={materialSupplied}placeholder="Enter Material Supplied"/>
                </div>
                <div className = "form-group" style = {{textAlign:"center", paddingBottom:"10px"}}>
                    <label htmlFor = "materialSupplied">Email: </label>
                    <input type = "text" email = "email" id = "email"onChange={e => setEmail(e.target.value)} value={email}placeholder="Enter Email Address"/>
                </div>
                <input type = "submit" value="Submit" style = {buttonStyle}/>
                <div>
                <Link to={'/login'} className = "btn btn-warning btn-block">Return to Login</Link>
                </div>
            </div>
        </form>
      )
}
export default Register;