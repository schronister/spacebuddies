// Include React
var React = require("react");

// Helper Functions
var helpers = require("./utils/helpers.js");

var Main = React.createClass({

    render: function() {

    return (
      <div className="container">

        <div className="row">

          <div className="jumbotron">
            <h1>SpaceBuddies</h1>
            <p><em>Find a friend for your next trip to the moon!</em></p>
          </div>
          <div className="container">
          <h1> Dashboard</h1>
            <a className="btn btn-success" href="#/profiles/all"> See profiles</a>
            <a className="btn btn-success" href="#/profiles/create">Create a new profile</a>
         
            {this.props.children}
            

          </div>
        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;