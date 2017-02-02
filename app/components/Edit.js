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
            editUser:"",
            userUpdated:false}
    },
    //get any database info when loading
    componentWillMount: function() {
        helpers.getOneFromDB(this.props.routeParams.id).then(function(data){
          this.setState({ name: data.name, description:data.description, photo:data.photo });
        }.bind(this));
        
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

    this.editUser({name:this.state.name, description: this.state.description, photo:this.state.photo});

    },
    //capture the new user info in a new state item
    editUser: function(editUser) {
    this.setState({ editUser: editUser });
    },
    //when form is submitted, save the info to db
    componentDidUpdate: function(prevProps, prevState){
        if (prevState.editUser != this.state.editUser){
            helpers.updateDB(this.props.routeParams.id,this.state.name, this.state.description, this.state.photo).then(function(data){
              this.setState({userUpdated:true})
            }.bind(this))
        }
    },

    render: function() {

    return (
    <div>
        <div className="createForm"> 
        <br />
          <h3>Editing profile for {this.state.name}</h3>
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
                Save Changes
              </button>
            </div>
            </div>
          </form>
          {this.state.userUpdated &&

          <div className="alert alert-success" role="alert">
            <h3>Changes Saved! <a href={"#/profiles/id/" + this.props.routeParams.id}>Back to profile</a></h3>
          </div>
          }
          <div className="imagePreview">
          <h3>Image Preview</h3>
          <img src={this.state.photo} />
          </div>
      </div>
      <br/>
      
  </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Create;