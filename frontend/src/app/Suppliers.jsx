import React from 'react'
import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

async function getSuppliers(payload) {
  return new Promise((resolve, reject) => {
      axios.get('http://localhost:8000/suppliers/', config)
          .then(x => {
              resolve(x.data)
          })
          .catch(x => reject(x.data))
  })
}

export class Suppliers extends React.Component {
  state = {suppliers: []}

  componentDidMount() {
    getSuppliers().then(x => {
      this.setState({suppliers: [...this.state.suppliers, ...x.data]})
    })
  }

  render() {
    return <>
      <div class="list-group">
        {
          this.state.suppliers.map(supplier =>
            <ul class="list-group">
              <li class="list-group-item">{supplier.firstName + ' ' + supplier.lastName}</li>
              <li class="list-group-item">{'Email: ' + supplier.email}</li>
              <li class="list-group-item">{'Material Supplied: ' + supplier.materialSupplied}</li>
              {/* <li class="list-group-item">{material.status}</li> */}
            </ul>
          )
        }
      </div>
    </>
  }
}