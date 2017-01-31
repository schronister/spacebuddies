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
        <h1>Profile for {this.state.user.name}</h1>
        <img src={this.state.user.photo}/>
        <p>{this.state.user.description}</p>

    </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Profile;