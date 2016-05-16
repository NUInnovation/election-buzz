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
            </div>
          </div>
        </nav>
          
        <div class="container-fluid text-center">    
          <div class="row content">
            <div class="col-sm-2" >
            </div>
            <div class="col-sm-8 text-center"> 
              <img src='../images/logo.png' />
              <h3> % of tweets related to: </h3>
              <select name="Theme" class="selectForm">
                <option value="Education">Education</option>
                <option value="Security">Security</option>
                <option value="Immigration">Immigration</option>
                <option value="Women">Women</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Supreme Court">Supreme Court</option>
                <option value="Tax">Taxes</option>
              </select>
              <div id='title_graph'>
                <div class='row'>
                  <div class="col-sm-6">
                      <h3>Followers</h3>
                  </div>
                  <div class="col-sm-6">
                      <h3>Candidates (past 3000 tweets)</h3>
                  </div>
                </div>
              </div>
              
              <div id="graph" class="row">
                <div class= "col-sm-5" id="candidatetweets">
                  <div id="fChart"></div>
                </div>
                 <div class= "col-sm-2" id="pictures">
                  <table>
                    <tbody>
                      <tr>
                        <a href="candidate.html?name=Hillary"><div class='candidatePicture'>
                        <img src='../images/hillary.jpg' class='img-circle candidateImg' />
                        @HillaryClinton
                        </div>
                        </a>
                      </tr>
                      <tr>
                        <a href="candidate.html?name=Bernie">
                        <div class='candidatePicture'>
                        <img src='../images/bernie.jpg' class='img-circle candidateImg' />
                        @BernieSanders
                        </div>
                        </a>
                      </tr>
                       <tr>
                         <a href="candidate.html?name=Trump">
                         <div class='candidatePicture'>
                        <img src='../images/trump.jpg' class='img-circle candidateImg' />
                        @realDonaldTrump
                        </div>
                        </a>
                      </tr>
                    </tbody>
                  </table> 
                </div>
                 <div class= "col-sm-5" id="followertweets">
                  <div id="chart"></div>
                </div>
              </div>
              <br/>
              <br/>
              <br/>
              <div id="Results">
                <div class="Hillary text-center">
                </div>
                <h3>Hillary Clinton</h3>
                <p>Top Twitter Followers:</p>
                <div id="TwitterFollowers">
                  <div class= "topfollowers">
                  <p>Follower1</p>
                </div>
                 <div class= "topfollowers">
                  <p>Follower2</p>
                </div>
                 <div class= "topfollowers">
                  <p>Follower3</p>
                </div>
                 <div class= "topfollowers">
                  <p>Follower4</p>
                </div>
                
                <form>
          Subject:<br/>
          <input type="text" name="firstname"></input><br/>
        </form>
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
