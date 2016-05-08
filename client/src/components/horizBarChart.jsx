var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;

var HorizBarChart=React.createClass({
  getDefaultProps: function() {
      return {
          width: 300,
          height: 150,
          chartClass: "candidatechart"
      };
  },

  getInitialState:function(){
      return {
          width:300
      };
  },
  render:function(){

      var data = [{Name: "JohnKasich", Number: 835, Tweets: 28.922},
                  {Name: "HillaryClinton", Number: 4, Tweets: 0.1359619},
                  {Name: "BernieSanders", Number:1, Tweets:0.0348189},
                  {Name: "TedCruz", Number:18, Tweets:0.626959247},
                  {Name: "realDonaldTrump", Number:62, Tweets:2.161031718368}];

      var max_n = 50;
      data.forEach(function(d,i){
        max_n = Math.max(max_n, d.Tweets);
      });

      console.log(" " + max_n);
      var dx = this.props.width / max_n;
      var dy = this.props.height / data.length;

      var rects = data.map(function(d, i){
        console.log("dy*i" + dy);
        return (
            <rect class="bar" x="0" y={dy*i} key={i} height={dy*0.9} width={dx * d.Tweets} rx="2" ry="2"/>
          );
      });




      return(
        <div id="chart">
          <svg class={this.props.chartClass} width={this.props.width}
          height={this.props.height}>
            {rects}
          </svg>
        </div>
      )
  }

});


module.exports = HorizBarChart;