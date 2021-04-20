import React from 'react'
import { Link } from 'react-router-dom'

/*
  Component that shows a LIST of clickable materials for a given site. 
  The clickable elements shown as a list will redirect to a component that displays specific info about the selected material.
*/

export class Materials extends React.Component {
  state = {}

  render() {
    return <>
      <div class="list-group">
        <Link to={'/site'} class="list-group-item list-group-item-action active">
          Material for site: example site
        </Link>
        <a href="#" class="list-group-item list-group-item-action">Material 1</a>
        <a href="#" class="list-group-item list-group-item-action">Material 2</a>
        <a href="#" class="list-group-item list-group-item-action">Material 3</a>
        <a href="#" class="list-group-item list-group-item-action disabled">Material 4</a>
      </div>
    </>
  }
}