import React, { Component } from 'react';
import { EmployeeTable} from "./EmployeeTable";

class GetEmployeeInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            isLoading: "Fetching...",
        }
    }
    componentDidMount() {
        this.getStudentData();
    }
    getStudentData = async () => {
        this.setState({isLoading: "Fetching..."});
        const response = await fetch("http://localhost:8000/builders");
        const data = await response.json();
        this.setState({employees : data});
        this.setState({ isLoading: " "});
    };
    render() {
        return (
            <div>
                <h2>View Employees {this.state.isLoading}</h2>
                <EmployeeTable employees={this.state.employees}/>
            </div>
        );
    }
}

export default GetEmployeeInfo;