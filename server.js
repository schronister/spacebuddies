// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
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
mongoose.connect("mongodb://localhost/spacebuddies");
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
    res.redirect("#/profile/"+doc.id);
  })
})

//get specific profile page
app.get("/api/profiles/id/:id", function(req,res){
  User.findById(req.params.id, function(err,doc){
    if (err) throw err;
    res.json(doc);
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
