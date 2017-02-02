// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");
var querystring = require("querystring");
// Include the react-router module
var router = require("react-router");
var hashHistory = router.hashHistory;



// Helper Functions
var helpers = {

  //save a user to the database
  saveToDB: function(name, description, photo) {
    return axios.post("/api/profiles", querystring.stringify({name: name, description:description, photo:photo}))
    .then(function(response) {
        console.log("Successfully saved new user");
        console.log(response);
        hashHistory.push('/profiles/id/'+response.data.doc._id);
    });
  },

  getAllFromDB: function() {
    return axios.get("/api/profiles")
    .then(function(response) {
      return response.data;
    });
  },

  getOneFromDB:function(id){
    return axios.get("/api/profiles/id/"+id)
    .then(function(response){
        return response.data;
    })
  },
  updateDB: function(id, name, description, photo){
    return axios({
        method:'put',
        url:'/api/profiles/id/' + id,
        data:querystring.stringify({
            name:name,
            description: description,
            photo:photo
        })
    }).then(function(response){
        console.log("User updated");
    })
  },
  getAPOD: function(){
    return axios.get("https://api.nasa.gov/planetary/apod?api_key=FR4R2oNwSxIayEh9YA2RxrXSfgRfVMtlj2hGS0dF")
    .then(function(response){
        return response.data;
    })
  },
  getNews: function(){
    return axios.get("/news").then(function(response){
        return response.data;
    })
  }

};


module.exports = helpers;
