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

async function getSites(payload) {
  return new Promise((resolve, reject) => {
      axios.get('http://localhost:8000/usersites',{ params: { userID: payload } } , config)
          .then(x => {
              resolve(x.data)
              console.log(x.data)
          })
          .catch(x => reject(x.data))
  })
}

export default function Home(props) {
    
  const [sites, setSites] = useState(undefined)
  // const userID = props.match.params.userID
  const userID = 26

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
    return(<>
          <h1>{props.match.params.userID}</h1>
          <div>
            <Site sites={sites || []} />
          </div>
    </>)
}