import React, {useState, useEffect} from 'react';
import Proptypes from 'prop-types'
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import { Site } from './Site';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

let status_flag = 0;

async function getSites(payload) {
  return new Promise((resolve, reject) => {
      axios.get('http://localhost:8000/usersites',{ params: { userID: payload } } , config)
          .then(x => {
              resolve(x.data)
              status_flag += x.data.length
              console.log(x.data)
          })
          .catch(x => reject(x.data))
  })
}

export default function Home(props) {
    
  const [sites, setSites] = useState(undefined)
  const userID = props.match.params.userID
  // const userID = 26

    useEffect(() => {
      if(!sites) {
        getSites(userID).then(x => {
          setSites(x)
        })
      }
    })

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
    const create_site_button = {
      backgroundColor: '#208000',
      width: '100%',
      marginBottom: '5px'
    }
    const get_builders_button = {
      backgroundColor: '##8FBC8F',
      width: '100%',
      marginBottom: '10px'
    }
    return(<>
        {/* {console.log(sites.length)} */}
        {/* <div> */}
        {
          status_flag > 1 ? <Link class="btn btn-primary" style={create_site_button} to={'/site/create/' + userID}>Create a Site</Link>: null
        }
        {
          status_flag > 1 ? <Link class="btn btn-primary" style={create_site_button} to={'/assignSite'}>Assign a Site</Link>: null
        }
        {
          status_flag > 1 ? <Link class="btn btn-primary" style={get_builders_button} to={'/suppliers/'}>Get a list of Suppliers</Link>: null
        }
        {
          status_flag > 1 ? <Link class="btn btn-primary" style={get_builders_button} to={'/builders/'}>Get a list of Builders</Link>: null
        }
        <Site sites={sites || []} />
        {/* </div> */}
    </>)
}