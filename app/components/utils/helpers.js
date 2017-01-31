// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");
var querystring = require("querystring");


// Helper Functions
var helpers = {

  //save a user to the database
  saveToDB: function(name, description, photo) {
    return axios.post("/api/profiles", querystring.stringify({name: name, description:description, photo:photo}))
    .then(function(response) {
        console.log("Successfully saved new user");
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

  deleteFromDB: function(title){
    return axios({
      method: 'post',
      url: "/api/profiles/delete",
      data: querystring.stringify({
        title:title
      })
    }).then(function(response){
      console.log("Deleted user");
    });
  }

};

// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;
