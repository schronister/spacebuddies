// Include React
var React = require("react");

// Helper Functions
var helpers = require("./utils/helpers.js");

var Dashboard = React.createClass({
    getInitialState: function(){
        return {
          photo:"",
          title:"",
          type:"",
          news:[],
        }
    },

    componentWillMount: function(){
        helpers.getAPOD().then(function(data){
            console.log("data", data);
            this.setState({photo: data.url, title: data.title, type:data.media_type});
        }.bind(this));

        helpers.getNews().then(function(data){
            this.setState({news:data});
        }.bind(this));
        
    },

    componentDidMount: function(){
        window.fbAsyncInit = function() {
          FB.init({
            appId      : '602154599982925',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.8'
          });
          FB.AppEvents.logPageView();   
        };

        (function(d, s, id){
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) {return;}
           js = d.createElement(s); js.id = id;
           js.src = "//connect.facebook.net/en_US/sdk.js";
           fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));


    },

    fbAuth: function(){
        var info = FB.login(function(response) {
            if (response.authResponse) {
             console.log('Welcome!  Fetching your information.... ');
             FB.api('/me', function(response) {
               console.log('Good to see you, ' + response.name + '.');
              return response.name;
             });
            } else {
             console.log('User cancelled login or did not fully authorize.');
            }
         });
        console.log(info);
        this.props.setUser(info);
    },

    callSetUser: function(name){
        this.props.setUser(name);
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
        <a href="#" onClick={this.fbAuth}>Log in with Facebook</a>

        </div>
        <div className="dashboardContent">
        <h2>NASA Image of the Day</h2>
        {this.state.type === "video" ? (
        <iframe src={this.state.photo}></iframe>
        ) : (
        <img className="img-responsive" src={this.state.photo}/> 
        )}
        
        <p>{this.state.title} - <a target='_blank' href="https://apod.nasa.gov/apod/astropix.html">Source</a></p>
        <h2>Latest Space News From <a target='_blank' href="https://www.reddit.com/r/space">/r/space</a></h2>
        <div className="spacenews">
        {
          this.state.news.map(function(obj, i){
          return <div key={i} id={i}>
          <p key={obj.title}>{i+1}. {obj.title} - 
          <a target='_blank' href={obj.link} id={i}>Link</a></p></div>
         }.bind(this))
        }
        </div>
        </div>
        
    </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Dashboard;