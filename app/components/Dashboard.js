// Include React
var React = require("react");

// Helper Functions
var helpers = require("./utils/helpers.js");

var Dashboard = React.createClass({
    getInitialState: function(){
        return {
          photo:"",
          title:"",
          news:[]
        }
    },

    componentWillMount: function(){
        helpers.getAPOD().then(function(data){
            console.log("data", data);
            this.setState({photo: data.url, title: data.title});
        }.bind(this));

        helpers.getNews().then(function(data){
            this.setState({news:data});
        }.bind(this));
        
    },

    render: function() {

    return (
    <div>    
        <div className="jumbotron">
        <h2>Headed to the moon?</h2>
        <p>Find your space buddies here. Our user database is full of galactic explorers like you.</p>
        <a href="#/profiles/all" className="btn btn-primary">View profiles</a>
        <br/>
        <br/>
        <p>Log in with Facebook to save profiles</p>
        <div className="fb-login-button" data-max-rows="1" data-size="large" data-show-faces="false" data-auto-logout-link="false"></div>
        </div>
        <div className="dashboardContent">
        <h3>NASA Photo of the Day</h3>
        <img className="img-responsive" src={this.state.photo}/>
        <p>{this.state.title} - <a target='_blank' href="https://apod.nasa.gov/apod/astropix.html">Source</a></p>
        <h3>Latest Space News From <a target='_blank' href="https://www.reddit.com/r/space">/r/space</a></h3>
        {
          this.state.news.map(function(obj, i){
          return <div key={i} id={i}>
          <p key={obj.title}>{i+1}. {obj.title} - 
          <a target='_blank' href={obj.link} id={i}>Link</a></p></div>
         }.bind(this))
        }
        </div>
        
    </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Dashboard;