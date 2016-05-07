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
                  {Name: "HillaryClinton", Number: 4, Tweets: 0.1359619}];

      var rects = data.map(function(d, i){
        return (
            <rect class="bar" x="0" y={i*60} key={i} height="50" width={d.Number}/>

          )
      });


      return(
        <div id="chart">
          <svg class={this.props.chartClass} width={this.props.width}
          height={this.props.height}>
            {rects}
          </svg>
        </div>
      )

      // return(
      //     <div>
      //         <svg id={this.props.chartId} width={this.state.width}
      //              height={this.props.height}>

      //             <g transform={transform}>
      //                 {rectBackground}
      //                 {rectForeground}
      //             </g>
      //         </svg>
      //     </div>

      //     );
  }

});


module.exports = HorizBarChart;