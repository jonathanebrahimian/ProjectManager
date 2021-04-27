import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export class SiteDetails extends React.Component {
  state = {
    siteID: 0,
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    title: "",
  }


  async getSite(payload) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8000/sites/',{ params: { siteID: payload } } , config)
            .then(x => {
                resolve(x.data)
                console.log(x.data)
            })
            .catch(x => reject(x.data))
    })
  }
  componentWillMount(){
		this.state.siteID = this.props.match.params.siteID;
	}
  componentDidMount() {
    const id = this.props.match.params.siteID
    this.setState({siteID: id})
    // console.log("id: "+id)
    this.getSite(id).then(x => {
      this.setState({
        description: x.description,
        startDate: x.startDate,
        endDate: x.endDate,
        location: x.location,
        title: x.title,
        siteID: x.siteID
      })
    })
  }

  render() {
    return <>
      {/* <div className="row">
        <div className="col-sm-6"> */}
        {console.log(this.state.siteID)}
          <div class="jumbotron">
            <h1 class="display-4">{this.state.title}</h1>
            <p class="lead">{this.state.description}</p>
            <hr class="my-4" />
            <p>{this.state.startDate}</p>
            <p>{this.state.endDate}</p>
            <p class="lead">
              <Link class="btn btn-primary btn-lg" role="button" to={{ pathname: '/materials/' + this.state.siteID, state: {title: this.state.title, id: this.state.siteID}}}>View Materials</Link>
            </p>
            <p class="lead">
            <Link to={`/roster/${this.state.siteID}`} className = "btn btn-primary btn-lg">View Roster</Link>
            </p>
            <p class="lead">
            <Link to={`/goals/${this.state.siteID}`} className = "btn btn-primary btn-lg">View Goals</Link>
            </p>
          </div>
        {/* </div>
      </div> */}
    </>
  }
}