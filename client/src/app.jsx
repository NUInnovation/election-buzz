var React = require("react");

var barChart = require('./components/barChart.jsx');
var hBarChart = require('./components/horizontalBarChart.jsx');

var ReactRouter = require('react-router');
var ReactDom = require('react-dom');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var App = React.createClass({

  render: function() {
    return (

      <h1>Test</h1>

      )
  }
});

var routes = (
  <Route path="/" component={App}></Route>
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