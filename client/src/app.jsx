var React = require("react");

var HorizBarChart = require('./components/horizBarChart.jsx');
var CategoryPicker = require('./components/categoryPicker.jsx');
var MainPage = require('./components/main_page.jsx');
var Candidates = require('./components/candidates.jsx');
var Candidate = require('./components/candidate.jsx');


var ReactRouter = require('react-router');
var ReactDom = require('react-dom');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var App = React.createClass({

  render: function() {
    return (

      <div className="container">
        <MainPage></MainPage>
      </div>

      )
  }
});

var routes = (
  <Route path="/" component={App}>
    <Route path="candidates" component={Candidates}>
      <Route path="/candidate/:candidateid" component={Candidate} />
    </Route>
  </Route>
);

if (typeof document !== "undefined"){
  ReactDom.render((
      <Router history={ReactRouter.hashHistory}>{routes}</Router>
  ), document.getElementById("content"));    
}


