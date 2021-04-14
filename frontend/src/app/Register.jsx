import React, { useState } from "react";

const Register =()=>{

    const [details, setDetails] = useState({
        username: "",
        password: "",
        user_type: "",
      });
      const submit = (e) => {
        const { id, details } = e.target;
        setDetails({ ...details, [id]: details });
      };

      return(
        <form onSubmit = {submit}>
            <div className = "form-inner">
                <h2>
                    Register
                </h2>
                <div className = "form-group">
                    <label htmlFor = "username">Username: </label>
                    <input type = "text" username = "username" id = "username" onChange={e => setDetails({...details,username:e.target.value})} value={details.username} placeholder="Enter username"/>
                </div>
                <div className = "form-group">
                    <label htmlFor = "password">Password:</label>
                    <input type = "text" password = "password" id = "password"onChange={e => setDetails({...details,password:e.target.value})} value={details.password}placeholder="Enter password"/>
                </div>
                <div class="col-4">
                    <label for = "ratingSelect">Job Role: </label>
                    <select name = "role" id ="role" className = "form-control">
                    <option value = "0"></option>
                        <option value = "manager">Manager</option>
                        <option value = "supplier">Supplier</option>
                    </select>
                </div>
                <input type = "submit" value="Submit"/>

            </div>
        </form>
    )

    


}
export default Register;