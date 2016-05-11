var React = require("react");

// var barCharts = require('./components/barCharts.jsx');
<<<<<<< HEAD
var hBarChart = require('./components/horizontalBarChart.jsx');
=======
// var hBarChart = require('./components/horizontalBarChart.jsx');
// var BarChart = require('./components/barChart.jsx');
var HorizBarChart = require('./components/horizBarChart.jsx');
>>>>>>> 28d0c47fa40b5a0f0c504f751dd543365bf3d4a9
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
// ReactDOM.render(<Router>{routes}</Router>, document.getElementById(''))
// Router.run(routes, function(Root){
//   React.render(<Root />, document.body);
// })

// ReactDOM.render(
//   // <div>hello world</div>,
//   <HBar></HBar>,
//   document.getElementById("content")
// )