// Include the React library
var React = require("react");

// Include the react-router module
var router = require("react-router");

// Include the Route component for displaying individual routes
var Route = router.Route;

// Include the Router component to contain all our Routes
var Router = router.Router;

//use browserHistory to keep history
var browserHistory = router.browserHistory;

// Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;

// Reference the high-level components
var Main = require("../components/Main");
var UserList = require("../components/UserList");
var Profile = require("../components/Profile");


// Export the Routes
module.exports = (

  <Router history={browserHistory}>
    <Route path="/" component={Main}>
	 	<IndexRoute component={Home} />
		<Route path="userlist" component={UserList} />
		<Route path="profile" component={Profile} />
    </Route>
  </Router>

);
