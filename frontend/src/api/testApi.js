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


  //Goals API
  addGoal(goalName,goalNotes,materialID,siteID,userID,endDate){
    return new Promise((resolve, reject)=>{
        axios.post(`${this.url}/goals`,goalName,goalNotes,materialID,siteID,userID,endDate)
        .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
    });
  }
  updateGoal(goalID,goalName,goalNotes,materialID,userID,endDate){
    return new Promise((resolve, reject)=>{
    axios.put(`${this.url}/goals`, goalID,goalName,goalNotes,materialID,userID,endDate)
    .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
    });
  }
  deleteGoal(goalID){
    return new Promise((resolve,reject)=>{
      axios.delete(`${this.url}/goals`, goalID)
      .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
    });
  }
}

export default testApi