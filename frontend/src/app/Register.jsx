import React, { useState } from "react";
import {users} from '../models/users';
const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

export class Register extends React.Component{
    state={
        username: "",
        password: "",
        usertype: 1,
        siteID: "",
        firstname: "",
        lastname: "",
        companyname: "",
        userdescription: "builder",
        materials: "",
        email: "",
    }

    handleChange = event =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    
    onChange(){
        this.props.addUsers(new users(this.state.usertype,this.state.userdescription,this.state.companyname,this.state.materials,this.state.firstname,this.state.lastname,this.state.username,this.state.password,this.state.siteID,this.state.email));
        this.setState({
        username: "",
        password: "",
        siteID: "",
        usertype: 1,
        firstname: "",
        lastname: "",
        companyname: "",
        userdescription: "builder",
        materials: "",
        email: "",
        })
    }

    

    render(){
        return<>
            <div className="col-12 mb-3 text-center">
                <h1>Add Member</h1>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="firstname">First Name</label>
                <input
                 name = "firstname"
                 value = {this.state.firstname}
                 onChange ={this.handleChange}
                 type = "text"   
                 className="form-control"
                 id="firstname"
                 placeholder="Enter First Name"
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="lastname">Last Name</label>
                <input
                 name = "lastname"
                 value = {this.state.lastname}
                 onChange ={this.handleChange}
                 type = "text"   
                 className="form-control"
                 id="lastname"
                 placeholder="Enter Last Name"
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                 name = "email"
                 value = {this.state.email}
                 onChange ={this.handleChange}
                 type = "email"   
                 className="form-control"
                 id="email"
                 placeholder={"Enter email"}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="companyname">Company Name</label>
                <input
                 name = "companyname"
                 value = {this.state.companyname}
                 onChange ={this.handleChange}
                 type = "text"   
                 className="form-control"
                 id="companyname"
                 placeholder="Enter Company Name"
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="companyname">Site ID</label>
                <input
                 name = "siteID"
                 value = {this.state.siteID}
                 onChange ={this.handleChange}
                 type = "text"   
                 className="form-control"
                 id="siteID"
                 placeholder="Enter Site ID to be added to"
                />
            </div>
            <div className="col-12 text-center">
            <button
                type="button"
                onClick={() =>
                this.onChange()
                }
                className="btn btn-primary mx-auto"
            >
            Submit
            </button>
            </div>
            
        </>
    }
}