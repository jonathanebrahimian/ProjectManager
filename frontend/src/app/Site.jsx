import React from 'react'
import { Link } from 'react-router-dom';


export class Site extends React.Component {
  state = {}

  render() {
    return <>
      <div class="jumbotron">
        <h1 class="display-4">Example Site</h1>
        <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <hr class="my-4" />
        <p class="lead">
          <li>goal 1</li>
          <li>goal 2</li>
          <li>goal 3</li>
        </p>
        <p class="lead">
          <Link class="btn btn-primary btn-lg"  role="button" to={'/materials'}>Available Materials</Link>
        </p>
      </div>
    </>
  }
}