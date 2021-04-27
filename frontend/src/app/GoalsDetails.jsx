import React, { useState, useEffect, Component } from 'react';
import {Goals} from './Goals';
import {testApi} from '../api/testApi';
import {Link} from 'react-router-dom';
import axios from 'axios';

const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
export class GoalsDetails extends React.Component {
    
    repo = new testApi();
    state = {
        isLoaded: false,
    }


    addGoal(goal){
        this.repo.addGoal(this.siteID,goal);
    }
    deleteGoal(goalID){
        this.repo.deleteGoal(goalID);
    }



    render(){
        if(!this.state.isLoaded){
			return <div id="product-details">Loading Goals...</div>
		}
        return(
            <div>
        <ul className= "list-group">
        {
            !this.state.goals.length && <li className= "list-group col-14 mb-3 mt-2 ml-5">No Current Goals</li>
        }
        {
            this.state.goals.map((x,i) => <li className = "card rounded container mb-3 mt-4" key = {i}>
            <div className = "card-body">
                <div className = "row mt-1 mb-1 ">
                        <div className = "text-muted">
                            {x.goalName}{" #"+x.goalID}
                        </div>
                    </div>
                </div>
                <div className = "row mt-1 mb-1">
                        <div className = "text-body">
                            "{x.goalNotes}"
                        </div>
                </div>
                <div className = "text-muted float-right">
                            {x.endDate}
                </div>
                {/* <button onClick = {()=>this.editGoal(x)} type = "button" class = "btn btn-warning btn-block">Edit Goal</button> */}
                <button onClick = {()=>this.deleteGoal(x.goalID)} type = "button" class = "btn btn-primary">Finish Goal</button>
            </li>)
        }
        </ul>
                <Goals addGoal = {goal => this.addGoal(goal)}/>
            </div>
        )
    }

    componentWillMount(){
		this.siteID = this.props.match.params.siteID;
	}
    componentDidMount(){
        this.state.isLoaded = true;
		const fetchPosts = async() =>{
            const res = await axios.get('http://18.217.93.185:8000/goals/',{ params: { siteID: this.siteID}},config);
            this.setState({goals: res.data})
        }
        fetchPosts();
	}
    componentDidUpdate(){
        const fetchPosts = async() =>{
            const res = await axios.get('http://18.217.93.185:8000/goals/',{ params: { siteID: this.siteID}},config);
            this.setState({goals: res.data})
        }
        fetchPosts();

    }



}
