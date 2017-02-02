// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require('request');
var cheerio = require("cheerio");
var User = require("./models/User.js");
var path = require("path");

// Initialize Express
var app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://heroku_qthd00nz:gnotat81v148ga1tgfdl1rpdbs@ds139959.mlab.com:39959/heroku_qthd00nz");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});






//getting all users
app.get("/api/profiles", function(req,res){
  User.find({}, function(err,doc){
    if (err) throw err;
    res.json(doc);
  })
})

//create new user
app.post("/api/profiles", function(req,res){
  var newUser = new User({name:req.body.name, description:req.body.description, photo:req.body.photo})
  newUser.save(function(err,doc){
    if (err) throw err;
    console.log(doc);
    res.send({doc});
  })
})

//get specific profile page
app.get("/api/profiles/id/:id", function(req,res){
  User.findById(req.params.id, function(err,doc){
    if (err) throw err;
    res.json(doc);
  })
})

//update existing user
app.put("/api/profiles/id/:id", function(req, res){
  User.findByIdAndUpdate(req.params.id, {$set: {name:req.body.name, description:req.body.description, photo:req.body.photo}}, function(err, doc){
    if (err) throw err;
    res.json(doc);
  })
})

//grab news articles
app.get("/news", function(req,res){
  request("https://www.reddit.com/r/space/top/?sort=top&t=day", function(error, response, html){
        var $ = cheerio.load(html);
        var result = [];
        $("a.title").each(function(i, element){
        var title = $(this).text();
        var link = $(element).attr("href");
        if (link.charAt(0) === "/"){
          link = "https://www.reddit.com"+link;
        }


        result.push({title:title, link:link});

        });
        res.json(result);        
    })
})

// Main "/" Route.
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})



// Listen on port 3000
app.listen(process.env.PORT|| 3000, function() {
  console.log("App running on port 3000!");
});
