var React = require("react");

// var barCharts = require('./components/barCharts.jsx');
var hBarChart = require('./components/horizontalBarChart.jsx');
var BarChart = require('./components/barChart.jsx');
var HorizBarChart = require('./components/horizBarChart.jsx');

var ReactRouter = require('react-router');
var ReactDom = require('react-dom');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var App = React.createClass({

  render: function() {
    return (

      <div className="container">
        <h1>Test</h1>
        <HorizBarChart></HorizBarChart>
        <BarChart></BarChart>
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
// ReactDOM.render(<Router>{routes}</Router>, document.getElementById(''))
// Router.run(routes, function(Root){
//   React.render(<Root />, document.body);
// })

// ReactDOM.render(
//   // <div>hello world</div>,
//   <HBar></HBar>,
//   document.getElementById("content")
// )