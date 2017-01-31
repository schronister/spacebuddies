// Include React
var React = require("react");

// Helper Functions
var helpers = require("./utils/helpers.js");

var ProfileShell = React.createClass({
    render: function() {

    return (
    <div>    
    {this.props.children}
    </div>
    );
  }
});

// Export the component back for use in other files
module.exports = ProfileShell;