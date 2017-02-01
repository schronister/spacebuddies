// Include the React library
var React = require("react");

// Include the react-router module
var router = require("react-router");

// Include the Route component for displaying individual routes
var Route = router.Route;

// Include the Router component to contain all our Routes
var Router = router.Router;

//use browserHistory to keep history
var hashHistory = router.hashHistory;

// Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;

// Reference the high-level components
var Main = require("../components/Main");
var Profile = require("../components/Profile");
var ProfileShell = require("../components/ProfileShell")
var ProfileList = require("../components/ProfileList")
var Create = require("../components/Create");
var Dashboard = require("../components/Dashboard");
var Edit = require("../components/Edit");


// Export the Routes
module.exports = (

  <Router history={hashHistory}>
    <Route path="/" component={Main}>
        <IndexRoute component={Dashboard}/>
		<Route path="profiles" component={ProfileShell}>
            <Route path="all" component={ProfileList} />
            <Route path="id/:id" component={Profile} />
            <Route path="create" component={Create} />
            <Route path="edit/:id" component={Edit} />
        </Route> 
    </Route>
  </Router>

);
