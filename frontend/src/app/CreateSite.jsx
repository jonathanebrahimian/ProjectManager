import React, {useState} from 'react';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

async function postSite(payload) {
  return new Promise((resolve, reject) => {
      axios.post('http://18.217.93.185:8000/sites', JSON.stringify(payload), config)
          .then(x => {
              resolve(x.data)
          })
          .catch(x => reject(x.data))
  })
}

export default function CreateSite(props) {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [location, setLocation] = useState()
  const userID = props.match.params.userID

  const create_site_button = {
    backgroundColor: '#208000',
    width: '100%',
    marginBottom: '10px'
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await postSite({
      title,
      description,
      location,
      startDate,
      endDate,
      userID
    })
    window.location.href = '/home/' + userID
  }

  return (<>
    <h1>Create a Site</h1>
    <hr/>
    <form onSubmit = {handleSubmit}>
      <div class="form-group">
        <label for="exampleFormControlInput1">Title</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" onChange={e => setTitle(e.target.value)}/>
      </div>
      <div class="form-group">
        <label for="exampleFormControlInput1">Location of the site</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" onChange={e => setLocation(e.target.value)}/>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Description of the site</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setDescription(e.target.value)}></textarea>
      </div>
      <div class="form-group row">
        <label for="example-date-input" class="col-2 col-form-label">Start Date</label>
        <div class="col-10">
          <input class="form-control" type="date" id="example-date-input" onChange={e => setStartDate(e.target.value)} />
        </div>
      </div>
      <div class="form-group row">
        <label for="example-date-input" class="col-2 col-form-label">End Date</label>
        <div class="col-10">
          <input class="form-control" type="date" id="example-date-input" onChange={e => setEndDate(e.target.value)} />
        </div>
      </div>
      <button type="submit" class="btn btn-primary mb-2" style={create_site_button}>Create Site</button>
    </form>
  </>)
}