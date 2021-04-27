import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

async function putMaterial(payload) {
  return new Promise((resolve, reject) => {
      axios.put('http://localhost:8000/materials/', JSON.stringify(payload.body), { params: { materialID: payload.header } }, config)
          .then(x => {
              resolve(x.data)
              console.log(x.data)
          })
          .catch(x => reject(x.data))
  })
}

export default function EditMaterial(props) {
  const [status, setStatus] = useState()
  const materialID = props.match.params.materialID

  const create_site_button = {
    backgroundColor: '#208000',
    width: '100%',
    marginBottom: '10px'
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log('at handle submit')
    await putMaterial({
      body: {
        status
      },
      header: {
        materialID
      }
    })
  }

  return (<>
    <h1>Edit Material</h1>
    <hr/>
    <form onSubmit = {handleSubmit}>
      <div class="form-group">
        <label for="exampleFormControlInput1">Status</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" onChange={e => setStatus(e.target.value)}/>
      </div>
      <Link type="submit" class="btn btn-primary mb-2" style={create_site_button} to={'/'}>Submit</Link>
    </form>
  </>)
}