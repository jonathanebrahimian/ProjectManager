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

async function getRoster(payload) {
  return new Promise((resolve, reject) => {
      axios.get('http://18.217.93.185:8000/roster/',{ params: { siteID: payload } } , config)
          .then(x => {
              resolve(x.data)
          })
          .catch(x => reject(x.data))
  })
}

export class Roster extends React.Component {
  state = {siteID: 0, rosters: []}

  componentWillMount(){
		this.state.siteID = this.props.match.params.siteID
	}

  componentDidMount() {
    // if(!this.state.materials) {
      const id = this.props.match.params.siteID
      console.log(id)
      // this.setState({ myArray: [...this.state.myArray, ...[1,2,3] ] }) //another array
      getRoster(id).then(x => {
        this.setState({rosters: [...this.state.rosters, ...x]})
      })
    // }
  }

  render() {
    return <>
      <div class="list-group">

        {
          this.state.rosters.map(roster =>
            <ul class="list-group">
              <li class="list-group-item">{roster.firstName + ' ' + roster.lastName}</li>
              {/* <li class="list-group-item">{material.status}</li> */}
            </ul>
          )
        }
      </div>
    </>
  }
}