// Include React
var React = require("react");

// Helper Functions
var helpers = require("./utils/helpers.js");

var ProfileShell = React.createClass({

    render: function() {

    return (
    <div>    
        {this.props.loggedIn=== true ? (
            <p>{this.props.userName}</p>
            ) : (
            <p>Not logged in </p>
            )}
    </div>
    );
  }
});

// Export the component back for use in other files
module.exports = ProfileShell;