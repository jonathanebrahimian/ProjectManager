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
        {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> */}

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            {/* <li class="nav-item">
              <a class="nav-link" href="#">Employees</a>
            </li> */}
            {/* <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sites
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Site 1</a>
                <a class="dropdown-item" href="#">Site 2</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Sites</a>
              </div>
            </li> */}
            {/* <li class="nav-item">
              <a class="nav-link" href="#">Employees</a>
            </li> */}
            {/* <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Profile
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">profile info1</a>
                <a class="dropdown-item" href="#">profile info2</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Account</a>
              </div>
            </li> */}
          </ul>
        </div>
      </nav>
    </>;
  }
}