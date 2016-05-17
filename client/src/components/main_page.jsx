var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;

var MainPage = React.createClass({
  
  componentDidMount: function(){
    var theme = "Education";
    function rightTheme(obj){
      return obj.Topic == theme;
    }

    var w =  $('#followertweets').width();
    var   h = $('#followertweets').height();

    var svg = d3.select("#chart")
      .append("svg")
      .attr("class",'candidatechart')
      .attr("width", w)
      .attr("height", h);
    var max_n = 10;

    d3.json("../data/tweetdata.json", function(json) {

      var data = json.Themes.filter(rightTheme);

      var data = data[0].Data;
      for (var d in data) {
        max_n = Math.max(data[d].Tweets, max_n);
      }
    
      var dx = w / max_n;
      var dy = h / data.length;
      
      
  
      // bars

      var bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", function(d, i) {return "bar " + d.Name;})
        .attr("x", function(d, i) {return 0;})
        .attr("y", function(d, i) {return dy*i;})
        .attr("width", function(d, i) {return dx*d.Tweets})
        .attr("height", dy*.95)
        .attr("rx",2)
        .attr("ry",2);
  
      // labels
      var text = svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", function(d, i) {return "label " + d.Name;})
        .attr("x", function(d,i) { return dx*d.Tweets+5})
        .attr("y", function(d, i) {return dy*i + dy/2;})
        .text( function(d) {return Number(d.Tweets).toFixed(1)  + "% ("+d.Number+" tweets)";})
        .style("font-weight", "bold");
    });
    

    $('select').on('change', function(){
      theme = this.value;
      d3.json("../data/tweetdata.json",function(json){
         
        var data = json.Themes.filter(rightTheme);

        var data = data[0].Data;
        for (var d in data) {
          max_n = Math.max(data[d].Tweets, max_n);
        }
        // debugger;
      
        var dx = w / max_n;
        var dy = h / data.length;

        svg.selectAll(".bar")
          .data(data)
          .transition()
          .attr("width", function(d, i) {return dx*d.Tweets});
        
        svg.selectAll("text")
          .data(data)
          .transition()
          .attr("x", function(d,i) { return dx*d.Tweets+5})
          .text( function(d) {return Number(d.Tweets).toFixed(1)  + "% ("+d.Number+" tweets)";});
      });
    });
    
    
    ///////////////////////////////////////////////////////////////
    /////////////////////////// FOLLOWERS /////////////////////////
    
    
    var w1 =  $('#candidatetweets').width();
    var h1 = $('#candidatetweets').height();

    var svg1 = d3.select("#fChart")
      .append("svg")
      .attr("class",'followerChart')
      .attr("width", w)
      .attr("height", h);
    var max_n1 = 10;

    d3.json("../data/tweetdata_followers.json", function(json) {

      var data = json.Themes.filter(rightTheme);

      var data = data[0].Data;
      for (var d in data) {
        max_n = Math.max(data[d].Tweets, max_n);
      }
      // debugger;
    
      var dx = w1 / max_n1;
      var dy = h1 / data.length;
  
      // bars
      var randNumbers = [(Math.random() * 8),(Math.random() * 8),(Math.random() * 8)]
      var bars = svg1.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", function(d, i) {return "bar " + d.Name;})
        .attr("x", function(d, i) {return w1-dx*randNumbers[i];})
        .attr("y", function(d, i) {return dy*i;})
        .attr("width", function(d, i) {return dx*randNumbers[i]})
        .attr("height", dy*.95)
        .attr("rx",2)
        .attr("ry",2);
  
      // labels
      var text = svg1.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", function(d, i) {return "label " + d.Name;})
        .attr("x", function(d,i) { return w1-dx*randNumbers[i]-40})
        .attr("y", function(d, i) {return dy*i + dy/2;})
        .text( function(d,i) {return Number(randNumbers[i]).toFixed(1)  + "%";})
        .style("font-weight", "bold");
    });

    $('select').on('change', function(){
      theme = this.value;
      d3.json("../data/tweetdata_followers.json",function(json,error){
        if (error) return console.warn(error);
         
        var data = json.Themes.filter(rightTheme);

        var data = data[0].Data;
        for (var d in data) {
          max_n1 = Math.max(data[d].Tweets, max_n);
        }
      
        var randNumbers = [(Math.random() * 8),(Math.random() * 8),(Math.random() * 8)]
        var dx = w1 / max_n1;
        var dy = h1 / data.length;

        svg1.selectAll(".bar")
          .data(data)
          .transition()
          .attr("x",function(d,i) { return w1-dx*randNumbers[i]})
          .attr("width", function(d, i) {return dx*randNumbers[i]});
        
        svg1.selectAll("text")
          .data(data)
          .transition()
          .attr("x", function(d,i) { return w1-dx*randNumbers[i]-40})
          .text( function(d, i) {return Number(randNumbers[i]).toFixed(1)  + "%";});
      });
    });
  },


  render:function(){
    return(
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>                        
              </button>
              <a className="navbar-brand" href="#">Election Buzz</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
              </ul>
            </div>
          </div>
        </nav>
          
        <div className="container-fluid text-center">    
          <div className="row content">
            <div className="col-sm-2" >
            </div>
            <div className="col-sm-8 text-center"> 
              <img src='../images/logo.png' />
              <h3> % of tweets related to: </h3>
              <select name="Theme" className="selectForm">
                <option value="Education">Education</option>
                <option value="Security">Security</option>
                <option value="Immigration">Immigration</option>
                <option value="Women">Women</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Supreme Court">Supreme Court</option>
                <option value="Tax">Taxes</option>
              </select>
              <div id='title_graph'>
                <div className='row'>
                  <div className="col-sm-6">
                      <h3>Followers</h3>
                  </div>
                  <div className="col-sm-6">
                      <h3>Candidates (past 3000 tweets)</h3>
                  </div>
                </div>
              </div>
              
              <div id="graph" className="row">
                <div className= "col-sm-5" id="candidatetweets">
                  <div id="fChart"></div>
                </div>
                 <div className= "col-sm-2" id="pictures">
                  <div className='candidatePicture'>
                    <a href="candidate.html?name=Hillary">
                      <img src='images/hillary.jpg' className='img-circle candidateImg' />
                    @HillaryClinton           
                    </a>
                  </div>
                  <div className='candidatePicture'>
                    <a href="candidate.html?name=Bernie">
                      <img src='images/bernie.jpg' className='img-circle candidateImg' />
                    @BernieSanders
                    </a>
                  </div>
                  <div className='candidatePicture'>  
                    <a href="candidate.html?name=Trump">
                      <img src='images/trump.jpg' className='img-circle candidateImg' />
                    @realDonaldTrump
                    </a>
                  </div>
                </div>
                <div className= "col-sm-5" id="followertweets">
                  <div id="chart">
                </div>
              </div>
            </div>
          </div>
          <br/>
          <br/>
          <br/>

        </div>
      </div>
    </div>
      );
  }
  
});

module.exports = MainPage;
