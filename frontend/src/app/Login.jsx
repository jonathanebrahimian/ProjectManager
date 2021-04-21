import React, {useState} from 'react';


const Login=()=>{
    const [details, setDetails] = useState({username:"",password:""});
    const submit = (e) => {
        e.preventDefault();
        console.log(details);
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
            height: "87vh",
            display: "flex",
            alignItems: "center",
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
                        Login
                    </h2>
                    <div className = "form-group" style = {{textAlign:"center", paddingBottom:"10px"}}>
                        <label htmlFor = "username">Username: </label>
                        <input type = "text" username = "username" id = "username" onChange={e => setDetails({...details,username:e.target.value})} value={details.username} placeholder="Enter username"/>
                    </div>
                    <div className = "form-group" style = {{textAlign:"center", paddingBottom:"10px"}}>
                        <label htmlFor = "password">Password: </label>
                        <input type = "password" password = "password" id = "password"onChange={e => setDetails({...details,password:e.target.value})} value={details.password}placeholder="Enter password"/>
                    </div>
                    <input type = "submit" style = {buttonStyle} value="Login" />
                </div>
            </form>
        )
}
export default Login;