import React from 'react'
import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react';
import axios from 'axios';

/*
  Component that shows a LIST of clickable materials for a given site. 
  The clickable elements shown as a list will redirect to a component that displays specific info about the selected material.
*/

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

async function getBuilders() {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8000/builders/', config)
        .then(x => {
          resolve(x.data)
          // console.log(x.data)
      })
      .catch(x => reject(x.data))
    })
}

export class Builders extends React.Component {
  state = {builders: []}

  componentDidMount() {
    getBuilders().then(x => {
      this.setState({builders: [...this.state.builders, ...x]})
    })
  }

  render() {
    return <>
      <h1>Builders</h1>
        {
          this.state.builders.map(builder =>
            <ul class="list-group">
              <li class="list-group-item">{'Name: ' + builder.firstName + ' ' + builder.lastName}</li>
              <li class="list-group-item">{'Email: ' + builder.email}</li>
            </ul>
          )
        }
    </>
  }
}