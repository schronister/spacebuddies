// Include React
var React = require("react");

// Helper Functions
var helpers = require("./utils/helpers.js");

var Main = React.createClass({
    getInitialState: function(){
        return {
          userName:"",
          loggedIn:"",
          savedBuddies:[]
        }
    },

    setUser: function(userName){
        this.setState({userName: response.name, loggedIn:true})
    },

    saveABuddy: function(buddy){
        var ary = this.state.savedBuddies;
        ary.push(buddy);
        this.setState({savedBuddies: ary});
    },

    render: function() {

    return (
        <div>
        <nav className="navbar navbar-inverse bg-inverse">
        <div className="container-fluid">
            <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">SpaceBuddies</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#/saved">My saved profiles</a></li>
                    <li><a href="#/">Dashboard</a></li>
                    <li><a href="#/profiles/all">See profiles</a></li>
                    <li><a href="#/profiles/create">Create a new profile</a></li>
                </ul>
            </div>
        </div>
        </nav>
        <div className="container">
            
         
            {this.props.children && React.cloneElement(this.props.children, {setUser:this.setUser, userName:this.state.userName, loggedIn:this.state.loggedIn, savedBuddies:this.state.savedBuddies, saveABuddy:this.saveAbuddy}
            

        </div>
    </div>

    );
  }
});

// Export the component back for use in other files
module.exports = Main;