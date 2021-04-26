import React from 'react';
import {goals} from '../models/goals';

export class Goals extends React.Component {
    state ={
        goalName: "",
        goalNotes: "",
        materialID:1,
        endDate: "",
        userID:1,
    }

    handleChange = event =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    onChange(){
        this.props.addGoal(new goals(this.state.goalName,this.state.goalNotes,this.state.materialID,this.state.userID,this.state.endDate));
        this.setState({
            goalName: "",
            goalNotes: "",
            materialID: 1,
            endDate: "",
            userID: 1,
        })
    }
    render(){
        return<>
        <div className = "goals-area">
            <input
            name = "goalName"
            value ={this.state.goalName}
            onChange = {this.handleChange}
            placeholder = "Goal Title"
            />
            <input
            name = "goalNotes"
            value ={this.state.goalNotes}
            onChange = {this.handleChange}
            placeholder = "Goal Description"
            />
            <input
            name = "endDate"
            value = {this.state.endDate}
            onChange = {this.handleChange}
            placeholder = "Deadline (YYYY-MM-DD)"
            />
            <div class="row mt-4 mb-4">
                <div class="col-12">
                    <button onClick = {()=>this.onChange()} type = "button" class = "btn btn-primary">Add Goal</button>
                </div>
            </div> 
        </div>

        </>

    }
}