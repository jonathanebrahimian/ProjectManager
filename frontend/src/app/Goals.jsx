import React, {Component, useState} from 'react';
import { Link } from 'react-router-dom';
import {GoalsList} from './GoalsList';
import {testApi} from '../api/testApi'

export class Goals extends React.Component {
    repo = new testApi();
    state ={
        title: "",
        description: "",
        materialID: 1,
        deadline: "",
        assignedWorker: 1,
        siteID: 1
    }

    handleChange = event =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.onSubmit({
            title: this.state.title,
            description: this.state.description,
            deadline: this.state.deadline,
            assignedWorkers: this.state.assignedWorkers,
            complete: false
        })
        this.repo.addGoal( this.state.title,this.state.description,this.state.materialID,this.state.siteID,this.state.assignedWorker,this.state.deadline)
        this.setState({
            title: "",
            description: "",
            deadline: "",
            materialID: 1,
            assignedWorker: 1,
            siteID: 1
        })
    }
    render(){
        return<>
        <form onSubmit={this.handleSubmit}>
            <input
            name = "title"
            value ={this.state.title}
            onChange = {this.handleChange}
            placeholder = "Goal Title"
            />
            <input
            name = "description"
            value ={this.state.description}
            onChange = {this.handleChange}
            placeholder = "Goal Description"
            />
            <input
            name = "deadline"
            value = {this.state.deadline}
            onChange = {this.handleChange}
            placeholder = "Deadline (YYYY-MM-DD)"
            />
            <input type = "submit" value="Add Goal" />
        </form>

        </>

    }
}