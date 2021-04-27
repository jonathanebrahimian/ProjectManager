import React, {useState} from 'react';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

async function assignSite(payload) {
  return new Promise((resolve, reject) => {
      axios.post('http://localhost:8000/assignSite', JSON.stringify(payload), config)
          .then(x => {
              resolve(x.data)
          })
          .catch(x => reject(x.data))
  })
}

export default function CreateSite(props) {
  const [siteID, setSiteID] = useState()
  const [userID, setUserID] = useState()

  const create_site_button = {
    backgroundColor: '#208000',
    width: '100%',
    marginBottom: '10px'
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await assignSite({
      siteID,
      userID
    })
    window.location.href = '/home/'
  }

  return (<>
    <h1>Assign a Site</h1>
    <hr/>
    <form onSubmit = {handleSubmit}>
      <div class="form-group">
        <label for="exampleFormControlInput1">Site ID</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" onChange={e => setSiteID(e.target.value)}/>
      </div>
      <div class="form-group">
        <label for="exampleFormControlInput1">User ID</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" onChange={e => setUserID(e.target.value)}/>
      </div>
      <button type="submit" class="btn btn-primary mb-2" style={create_site_button}>Assign Site</button>
    </form>
  </>)
}