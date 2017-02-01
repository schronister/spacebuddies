// Include React
var React = require("react");
var querystring = require("querystring");

// Helper Functions
var helpers = require("./utils/helpers.js");

var Create = React.createClass({
    getInitialState: function(){
    return {name:"",
            description:"",
            photo:"",
            newUser:""}
    },
    //keep the state in sync with the form
    handleChange: function(event){
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
    },
    //handling the submission of the user form
    handleSubmit: function(event){
    event.preventDefault();

    this.newUser({name:this.state.name, description: this.state.description, photo:this.state.photo});

    },
    //capture the new user info in a new state item
    newUser: function(newUser) {
    this.setState({ newUser: newUser });
    },
    //when form is submitted, save the info to db
    componentDidUpdate: function(prevProps, prevState){
        if (prevState.newUser != this.state.newUser){
            helpers.saveToDB(this.state.name, this.state.description, this.state.photo).then(function(data){
            //redirect to the new user profile
            }.bind(this))
        }
    },

    render: function() {

    return (
    <div>
        <div className="createForm"> 
        <br />
          <h3>Create a new profile</h3>
          <br/>
      
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="row">
              <label htmlFor="name" className="col-sm-2 control-label">Name</label>
              <div className="col-sm-9">
              <input
                value={this.state.name}
                type="text"
                className="form-control"
                id="name"
                onChange={this.handleChange}
                required
              />
              </div>
              </div>
              <div className="row">
              <label htmlFor="description" className="col-sm-2 control-label">Description</label>
              <div className="col-sm-9">
              <textarea  
                required 
                onChange={this.handleChange} 
                id="description" 
                className="form-control" 
                value={this.state.description} rows="3">
              </textarea>
              </div>
              </div>
              <div className="row">
              <label htmlFor="photo" className="col-sm-2 control-label">Photo url</label>
              <div className="col-sm-9">
              <input
                value={this.state.photo}
                type="text"
                className="form-control"
                id="photo"
                onChange={this.handleChange}
                required
              />
              </div>
              </div>
              <br />
              <br />
              <div className="row">
              <button
                className="btn btn-primary"
                type="submit"
              >
                Create
              </button>
            </div>
            </div>
          </form>
      </div>
    </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Create;