// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");
var querystring = require("querystring");
var request = require('request');
var cheerio = require("cheerio");


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
  },
  getAPOD: function(){
    return axios.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
    .then(function(response){
        return response.data;
    })
  },
  getNews: function(){
    request("https://www.reddit.com/r/space/top/?sort=top&t=day", function(error, response, html){
        console.log(html);
        var $ = cheerio.load(html);
        var result = [];
        $("a.title").each(function(i, element){
        var title = $(this).text();
        var link = $(element).attr("href");


        result.push({title:title, link:link});
        response.json(result);
        });
        
    })
  }

};


module.exports = helpers;
