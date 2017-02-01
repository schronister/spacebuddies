// Include React
var React = require("react");

// Helper Functions
var helpers = require("./utils/helpers.js");

var ProfileShell = React.createClass({

    getInitialState: function(){
    return {userName:"",
            loggedIn:"",
            savedBuddies:""}
    },

    componentWillMount: function() {
        var userData = FB.api('/me', function(response) {
          return (JSON.stringify(response));
        });
        if (FB.getLoginStatus(function(response) {
            getStatus(response);
        }) === true){
            console.log("logged in")
            this.setState({userName: userData.name, loggedIn:true})
        }

    },

    render: function() {

    return (
    <div>    
        {this.state.loggedIn=== true ? (
            <p>{this.state.userName}</p>
            ) : (
            <p>Not logged in </p>
            )}
    </div>
    );
  }
});

// Export the component back for use in other files
module.exports = ProfileShell;