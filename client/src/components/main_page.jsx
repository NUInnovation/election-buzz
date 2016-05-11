var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;

var MainPage = React.createClass({
  
  render:function(){
    return(
      <div>
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">Election Buzz</a>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
              <ul class="nav navbar-nav">
                <li class="active"><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Projects</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
              <ul class="nav navbar-nav navbar-right">
                <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div class="container-fluid text-center">
          <div class="row content">
            <div class="col-sm-2 sidenav">
              <p><a href="#">Link</a></p>
              <p><a href="#">Link</a></p>
              <p><a href="#">Link</a></p>
            </div>
            <div class="col-sm-8 text-center">
              <h1>Election Buzz</h1>
              <h3> Mentions of: TOPIC </h3>
              <p>Candidates vs. Followers </p>
              <div id="graph" class="row">
                <div class="col-sm-5" id="candidatetweets">
                  <p>Box 1</p>
                </div>
                <div class="col-sm-2" id="pictures">
                  <table>
                    <tbody>
                    <tr>
                      Hillary
                    </tr>
                    <tr>
                      Bernie
                    </tr>
                    <tr>
                      Trump
                    </tr>
                    </tbody>
        
                  </table>
                </div>
                <div class="col-sm-5" id="followertweets">
                  <p>Box 3</p>
                </div>
              </div>
              <br></br>
              <div id="Results">
                <div class="Hillary text-center">
                </div>
                <h3>Hillary Clinton</h3>
                <p>Top Twitter Followers:</p>
                <div id="TwitterFollowers">
                  <div class="topfollowers">
                    <p>Follower1</p>
                  </div>
                  <div class="topfollowers">
                    <p>Follower2</p>
                  </div>
                  <div class="topfollowers">
                    <p>Follower3</p>
                  </div>
                  <div class="topfollowers">
                    <p>Follower4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
  
});

module.exports = MainPage;
