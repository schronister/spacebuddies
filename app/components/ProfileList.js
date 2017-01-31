// Include React
var React = require("react");

// Helper Functions
var helpers = require("./utils/helpers.js");

var ProfileShell = React.createClass({
    getInitialState: function(){
    return {
      users:[],
    }
      },
    //get any database info when loading
      componentWillMount: function() {
        helpers.getAllFromDB().then(function(data){
          this.setState({ users: data });
        }.bind(this));
        
      },

    render: function() {

    return (
    <div className="row">

          <div className="col-lg-12">

            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Users</h3>
              </div>
              <div className="panel-body text-center">
                {
                  this.state.users.map(function(obj, i){
                  return <div key={i} id={i}>
                  <img className="img-responsive" src={obj.photo} />
                  <p key={obj.name}>{obj.name} - {obj.description}
                  <a href={"#/profiles/id/" + obj._id} className='btn btn-success' id={i}>View Profile</a></p></div>
                 }.bind(this))
                }
              </div>
            </div>

          </div>

        </div>
    );
  }
});

// Export the component back for use in other files
module.exports = ProfileShell;