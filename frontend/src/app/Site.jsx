import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export class Site extends React.Component {
  render() {
    return <>
      <div className="row">
        { 
          this.props.sites.map(site =>
            <div className="col-sm-4" key={site.siteID}>
              <div class="card" styles="width: 18rem;">
                <img src="https://via.placeholder.com/50" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">{site.title}</h5>
                  <p class="card-text">{site.description}</p>
                  <Link class="btn btn-primary" to={'/site/' + site.siteID}>Go to site</Link>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </>
  }
}