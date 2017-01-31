// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var UserSchema = new Schema({
  // name is a required string
  name: {
    type: String,
    required: true,
  },
  description: {
    type:String,
    required:true,
  },
  photo: {
    type: String,
    required:true
  }
});

// Create the User model
var User = mongoose.model("User", UserSchema);

// Export the model
module.exports = User;
