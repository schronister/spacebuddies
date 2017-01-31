// Include React
var React = require("react");

// Helper Functions
var helpers = require("./utils/helpers.js");

var Dashboard = React.createClass({
    getInitialState: function(){
        return {
          photo:"",
          news:[]
        }
    },

    componentWillMount: function(){
        helpers.getAPOD().then(function(data){
            console.log("data", data);
            this.setState({photo: data.url});
        }.bind(this));

        var data = helpers.getNews();
        this.setState({news:data});
    },

    render: function() {

    return (
    <div>    
        <div className="jumbotron">
        <h2>Headed to the moon?</h2>
        <p>Find your space buddies here. Our user database is full of galactic explorers like you.</p>
        <a href="#/profiles/all" className="btn btn-primary">View profiles</a>
        </div>

        <h4>Space News</h4>

        <h4>NASA Photo of the Day</h4>
        <img className="img-responsive" src={this.state.photo}/>
        <p><a href="https://apod.nasa.gov/apod/astropix.html">Source</a></p>
    </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Dashboard;