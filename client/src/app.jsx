var React = require("react");

var HorizBarChart = require('./components/horizBarChart.jsx');
var CategoryPicker = require('./components/categoryPicker.jsx');
var MainPage = require('./components/main_page.jsx');

var ReactRouter = require('react-router');
var ReactDom = require('react-dom');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var App = React.createClass({

  render: function() {
    return (

      <div className="container">
        <MainPage></MainPage>
        <CategoryPicker></CategoryPicker>
        <HorizBarChart></HorizBarChart>
      </div>

      )
  }
});

var routes = (
  <Route path="/" component={App}>
  </Route>
);

ReactDom.render((
    <Router history={ReactRouter.hashHistory}>{routes}</Router>
), document.getElementById("content"));