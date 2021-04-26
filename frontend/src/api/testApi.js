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
  addGoal(siteID, goal){
    return new Promise((resolve, reject)=>{
        axios.post(`${this.url}/goals`,goal, { params: { siteID: siteID } }, this.config)
        .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
    });
  }
  updateGoal(goalID,goal){
    return new Promise((resolve, reject)=>{
    axios.put(`${this.url}/goals`, goal,{ params: { goalID: goalID } }, this.config)
    .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
    });
  }
  deleteGoal(goalID){
    return new Promise((resolve,reject)=>{
      axios.delete(`${this.url}/goals`, {params: {goalID:goalID}})
      .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
    });
  }
  getGoal(siteID,userID){
    return new Promise((resolve,reject)=>{
      axios.get(`${this.url}/goals`,{ params: { siteID: siteID,userID: userID}},this.config)
      .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
    });
  }
  getGoal(siteID){
    return new Promise((resolve,reject)=>{
      axios.get(`${this.url}/goals`,{ params: { siteID: siteID}},this.config)
      .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
    });
  }
}

export default testApi