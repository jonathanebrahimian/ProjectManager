import React, {Component, useState} from 'react';
import { Link } from 'react-router-dom';
import {Goals} from './Goals';

export class GoalsList extends React.Component{
    state = {
        goals: []
    };
    addGoals = (goal) =>{
        const newGoal = [goal,...this.state.goals];
        this.setState({
            goals: newGoal
        })
    }

    render(){
        return(
            <div>
                <Goals onSubmit={this.addGoals} />
                {JSON.stringify(this.state.goals)}
            </div>
        )
    }
}