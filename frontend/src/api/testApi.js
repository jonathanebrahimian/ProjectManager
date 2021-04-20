import axios from 'axios'

export class testApi {
  url = 'http://localhost:8000'

  getValues() {
    return new Promise((resolve, reject) => {
      axios.get(`${this.url}/values`)
      .then(x => resolve(x.data))
      .catch(x => reject(x))
    })
  }

  postMaterials(payload) {
    let dummmy_payload = {
      "id": 12345,
		  "name": "Dummy material",
		  "statusIn": 0,
		  "inventory": 0,
		  "quality": 0,
		  "supplier": 0,
      "siteID": 0,
		  "userID": 123
    }

    return new Promise((resolve, reject) => {
      axios.post(`${this.url}/materials`, dummmy_payload) 
        .then(x => resolve(x.data))
        .catch(x => reject(x.data))
    })
  }
}

export default testApi