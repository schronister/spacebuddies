// Include React
var React = require("react");

// Helper Functions
var helpers = require("./utils/helpers.js");

var Profile = React.createClass({
    getInitialState: function(){
    return {
      user:{},
    }
      },
    //get any database info when loading
      componentWillMount: function() {
        helpers.getOneFromDB(this.props.routeParams.id).then(function(data){
          this.setState({ user: data });
        }.bind(this));
        
      },


    render: function() {

    return (
    <div>
        <div className="profile">
            <h1>Profile for {this.state.user.name}</h1>
            <div className="row">
                <div className="col-sm-4">
                    <img className="profileImg" src={this.state.user.photo}/>
                </div>
                <div className="col-sm-8 profileDescription">
                    <p>{this.state.user.description}</p>
                    <a className="btn btn-danger" href={"#/profiles/edit/"+this.props.routeParams.id}>Edit this profile </a>
                </div>
            </div>
        </div>
    </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Profile;