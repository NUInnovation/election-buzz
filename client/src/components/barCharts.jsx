var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;

var BarCharts = React.createClass({

  render: function(){
    return (
      <h1>Test</h1>
        // <HBar data={[
        //   {v: 30, label: 'Ted Cruz'},
        //   {v: 10, label: 'John Kasich'},
        //   {v: 5, label: 'Donald Trump'},
        //   {v: 15, label: 'Hillary Clinton'},
        //   {v: 30, label: 'Bernie Sanders'}
        // ]}/>
    );
  }
});

module.exports = BarCharts;