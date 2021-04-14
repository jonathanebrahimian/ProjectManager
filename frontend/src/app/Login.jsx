import React, {useState} from 'react';


const Login = () =>{
    const [details, setDetails] = useState({username:"",password:""});
    const submit = (e) => {
        const { id, details } = e.target;
        setDetails({ ...details, [id]: details });
      };
        return(
            <form onSubmit = {submit}>
                <div className = "form-inner">
                    <h3>
                        Login
                    </h3>
                    <div className = "form-group">
                        <label htmlFor = "username">Username: </label>
                        <input type = "text" username = "username" id = "username" onChange={e => setDetails({...details,username:e.target.value})} value={details.username} placeholder="Enter username"/>
                    </div>
                    <div className = "form-group">
                        <label htmlFor = "password">Password:</label>
                        <input type = "text" password = "password" id = "password"onChange={e => setDetails({...details,password:e.target.value})} value={details.password}placeholder="Enter password"/>
                    </div>
                    <input type = "submit" value="Login"/>
                </div>
            </form>
        )
}
export default Login;