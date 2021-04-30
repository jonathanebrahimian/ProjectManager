import React from 'react'
import { Link } from 'react-router-dom';
import { LogOut } from './LogOut'

export class Nav extends React.Component {

  state = {token: 0}

  componentDidMount() {
    this.setState({token: this.props.token})
  }

  render() {
    return <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link class="navbar-brand" to={'/home/' + this.state.token}>Construction Manager</Link>
        <LogOut />
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
          </ul>
        </div>
      </nav>
    </>;
  }
}