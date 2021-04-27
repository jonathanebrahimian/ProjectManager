import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export class LogOut extends React.Component {
  state = {navigate: false}

  logout = () => {
    localStorage.clear('token')
    this.setState({navigate: true})
    window.location.reload()
  }

  render() {
    const { navigate } = this.state

    if(navigate) {
      return <Redirect to="/" Push={true} />
    }

    return <button onClick={this.logout}>Log Out</button>
  }
}