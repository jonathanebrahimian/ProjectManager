import React, {Component, useState} from 'react';
import { Link } from 'react-router-dom';
import {GoalsList} from './GoalsList';

export class Goals extends React.Component {
    state ={
        title: "",
        description: "",
        deadline: "",
        assignedWorker: ""
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
        this.setState({
            title: "",
            description: "",
            deadline: "",
            assignedWorker: ""
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
            <GoalsList goals = {this.state.goals}/>
            <GoalsList addGoals = {goals => this.addGoals(goals)} />
            <input type = "submit" value="Add Goal" />
        </form>

        </>

    }
}