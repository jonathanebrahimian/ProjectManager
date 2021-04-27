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

async function getMaterials(payload) {
  return new Promise((resolve, reject) => {
      axios.get('http://18.217.93.185:8000/materials/',{ params: { siteID: payload } } , config)
          .then(x => {
              resolve(x.data)
          })
          .catch(x => reject(x.data))
  })
}

export class Materials extends React.Component {
  state = {siteID: 0, materials: []}

  componentWillMount(){
		this.state.siteID = this.props.match.params.siteID
	}

  componentDidMount() {
    // if(!this.state.materials) {
      const id = this.props.location.state.id
      console.log(id)
      // this.setState({ myArray: [...this.state.myArray, ...[1,2,3] ] }) //another array
      getMaterials(id).then(x => {
        this.setState({materials: [...this.state.materials, ...x]})
      })
    // }
  }

  render() {
    return <>
      <div class="list-group">
        <Link to={'/site/' + this.props.location.state.id} class="list-group-item list-group-item-action active">
          {this.props.location.state.title ? this.props.location.state.title : this.props.location.state.id}
        </Link>

        {
          this.state.materials.map(material =>
            <ul class="list-group">
              <li class="list-group-item">{material.materialSupplied + ' (status: ' + material.status + ')'}<br /><Link className = "btn btn-primary btn-lg" to={'/editMaterials/' + material.materialID}>Edit Material</Link></li>
              {/* <li class="list-group-item">{material.status}</li> */}
            </ul>
          )
        }
      </div>
    </>
  }
}