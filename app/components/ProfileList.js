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

          <div className="col-sm-12 userSection">
            
                <h1>All Profiles</h1>
                          
                {
                  this.state.users.map(function(obj, i){
                  return <div key={i} id={i} className="userDiv col-lg-4 col-md-6 col-sm-12">
                  <img className="img-responsive" src={obj.photo} />
                  <h4 key={obj.name}><strong>{obj.name}</strong></h4>
                  <p><a href={"#/profiles/id/" + obj._id} className='btn btn-success' id={i}>View Profile</a></p></div>
                 }.bind(this))
                }
          </div>
    </div>
    );
  }
});

// Export the component back for use in other files
module.exports = ProfileShell;