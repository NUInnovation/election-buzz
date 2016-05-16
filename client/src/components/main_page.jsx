var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;

var MainPage = React.createClass({
  
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
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <a href="candidate.html?name=Hillary">
                          <div className='candidatePicture'>
                          <img src='../images/hillary.jpg' className='img-circle candidateImg' />
                          @HillaryClinton
                          </div>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="candidate.html?name=Bernie">
                          <div className='candidatePicture'>
                          <img src='../images/bernie.jpg' className='img-circle candidateImg' />
                          @BernieSanders
                          </div>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="candidate.html?name=Trump">
                            <div className='candidatePicture'>
                              <img src='../images/trump.jpg' className='img-circle candidateImg' />
                              @realDonaldTrump
                            </div>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table> 
                </div>
                 <div className= "col-sm-5" id="followertweets">
                  <div id="chart"></div>
                </div>
              </div>
              <br/>
              <br/>
              <br/>
              <div id="Results">
                <div className="Hillary text-center">
                </div>
                <h3>Hillary Clinton</h3>
                <p>Top Twitter Followers:</p>
                <div id="TwitterFollowers">
                  <div className= "topfollowers">
                  <p>Follower1</p>
                </div>
                 <div className= "topfollowers">
                  <p>Follower2</p>
                </div>
                 <div className= "topfollowers">
                  <p>Follower3</p>
                </div>
                 <div className= "topfollowers">
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
