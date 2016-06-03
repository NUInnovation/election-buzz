var express = require('express');
var app = express();
var Firebase = require('firebase');
var fs = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');
// var https = require('https');
var http = require('http');
//configure to use bodyParser

//configure the https server using openssl certificates
// var options = {
// 	key: fs.readFileSync('key.pem'),
// 	cert: fs.readFileSync('cert.pem')
// };



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8081;
// var https_port = process.env.PORT || 8080;

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: '<USER>',
	password: '<PWD>',
	database: 'tweet_db'
});

connection.connect();

// this keeps the connection open always 
// will do this every 10 seconds
setInterval(function() {
	var sqlQuery = "SELECT 1";
	connection.query(sqlQuery, function() { });
},10000);

var config = {
    databaseURL: "https://electionbuzztimeline1.firebaseio.com",
    serviceAccount: "electionbuzztimeline1-e6a4767e9696.json"  
};
//firebase.initializeApp(config);
//Firebase.initializeApp(config);
var ref = new Firebase('https://electionbuzztimeline.firebaseio.com/');
//var db = firebase.database();
//var ref = db.ref('/');


var router = express.Router(); // instance of express router
/*
router.get('/',function(req, res) {
	res.json({ message: "hey I did it! " });
});
*/

router.route('/cloud')
	.get(function(req,res) {
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth()+1;
		var day = today.getDate();
		console.log(today);
		var q = req.query;
		if (q.hasOwnProperty('year') && q.hasOwnProperty('month') && q.hasOwnProperty('day') && q.hasOwnProperty('candidate')) {
			var sqlQuery = "select tweet_text from tweets join users on tweet_user_id=user_id where prev_tweet>0 and year(tweet_timestamp)="+req.query.year+" and month(tweet_timestamp)="+req.query.month+" and day(tweet_timestamp)="+req.query.day+" and support like '"+req.query.candidate+"' order by rand() limit 20000;";
			console.log(sqlQuery);
			connection.query(sqlQuery,function(err,rows,fields) {
				console.log("Result has "+rows.length+"total rows");
				res.json(rows);
			});
		}
		else {
			res.send("WRONG REQUEST");
		}
	});
router.route('/candidate')
        .get(function(req,res) {
                var today = new Date();
                var year = today.getFullYear();
                var month = today.getMonth()+1;
                var day = today.getDate();
                console.log(today);
                var q = req.query;
                if (q.hasOwnProperty('year') && q.hasOwnProperty('month') && q.hasOwnProperty('candidate')) {
                        var sqlQuery = "select tweet_text from tweets join users on tweet_user_id=user_id where year(tweet_timestamp)="+req.query.year+" and month(tweet_timestamp)="+req.query.month+" and screen_name='"+q.candidate+"' order by rand() limit 20000;";
                        console.log(sqlQuery);
                        connection.query(sqlQuery,function(err,rows,fields) {
                                console.log("Result has "+rows.length+"total rows");
                                res.json(rows);
                        });
                }
                else {
                        res.send("WRONG REQUEST");
                }
        });
router.route('/follower_tweets')
        .get(function(req,res) {
                var today = new Date();
                var year = today.getFullYear();
                var month = today.getMonth()+1;
                var day = today.getDate();
                console.log(today);
                var q = req.query;
		if (q.hasOwnProperty('candidate')){
			
		var sqlQuery = "select support,tweet_text from tweets join users on tweet_user_id=user_id where support='"+q.candidate+"' AND year(tweet_timestamp)=2016 and month(tweet_timestamp)=5 order by rand() limit 20000;";
                        console.log(sqlQuery);
                        connection.query(sqlQuery,function(err,rows,fields) {
                                console.log("Result has "+rows.length+"total rows");
                                res.json(rows);
                        });
		}
		else { res.send("WRONG REQUEST!"); }
        });
router.route('/totals') 
	.get(function(req,res) {
		var sqlQuery = "select count(*),prev_tweet from tweets group by prev_tweet;";
		connection.query(sqlQuery,function(err, rows, fields) {
			res.json(rows);
		});
	});

router.route('/timeline')
        .get(function(req, res) {
                console.log("Asking for timeline for a word ");
                console.log(req.query);
                var q = req.query;
                if (q.hasOwnProperty('word'))
                {
			q.word = q.word.replace("\'","''");
			q.word = q.word.replace('\"','""');
			if (q.word===''){ 
				res.send("Wrong request"); 
				console.log("wrong request");
				return;
			}
			console.log('checking if in firebase');
			ref.once('value',function(snapshot){
				//console.log(snapshot.val());
				//console.log('hi');
				//if (1===2)// this will help set it every time in firebase
				// since the data changes a lot. should be changed to 
				// the correct exitst() after
				if (snapshot.child(q.word).exists())
				{	
					console.log('exists!');	
					var childRef = ref.child(q.word);
					childRef.on('value',function(snapshot){
						res.json(snapshot.val());
					});
				}
				else{
					console.log('does not exist');
					var childRef = ref.child(q.word);
		                	var sqlQuery = "select support, CONCAT( cast(year(tweet_timestamp) as char(4)), '/', cast(week(tweet_timestamp) as cHAR(2))) Date, count(*) Ct FROM tweets JOIN users on user_id=tweet_user_id WHERE MATCH(tweet_text) AGAINST ('"+q.word+"') and prev_tweet>0 and support not like '' group by CONCAT(support,'/',Date) order by Date,support";

					connection.query(sqlQuery, function(err, rows, fields) {
                                		console.log(JSON.stringify(rows));
                                		var result = JSON.parse(JSON.stringify(rows));
                                		console.log("getting data and putting it in firebase for word "+q.word);
                                		res.json(rows);
                                		childRef.set(result);
                        		});
				}
			});
                }
                else{
                	res.send("wrong request");
                }
        });

router.route('/followers')
	.get(function(req, res) {
		console.log("Asking for follower breakdown");
		var sqlQuery1 = "select screen_name, follower_count,description, picture_url from users where follow_sanders=1 order by follower_count DESC limit 20;";
		var sqlQuery2 =" select screen_name, follower_count, description, picture_url  from users where follow_trump=1 order by follower_count DESC limit 20;";
		var sqlQuery3 = " select screen_name, follower_count, description, picture_url  from users where follow_clinton=1 order by follower_count DESC limit 20;";
		var reply = {};
		var replyJson = {};
		connection.query(sqlQuery1, function(err, rows, fields) {
			jsonRows = JSON.stringify(rows);
			//console.log(jsonRows);
			//res.json(rows);
			replyJson.Sanders = JSON.parse(jsonRows);
			reply.Sanders=jsonRows;
		})
		connection.query(sqlQuery2, function(err, rows, fields) {
                       	jsonRows = JSON.stringify(rows);
                       	//console.log(jsonRows);
			replyJson.Trump = JSON.parse(jsonRows);
                       	reply.Trump=jsonRows;
               	});
		connection.query(sqlQuery3, function(err, rows, fields) {
                        jsonRows = JSON.stringify(rows);
                        console.log(jsonRows);
                        reply.Clinton=jsonRows;
			replyJson.Clinton = JSON.parse(jsonRows);
			console.log("This is the reply:");
			//console.log(reply);
			console.log("Writing to firebase");
			var childRef = ref.child('twitter_followers');
			var replyCopy = reply;
			childRef.set(replyJson);
			res.json(replyJson);
                });
	});

router.route('/users')
	.get(function(req,res) {
		console.log("Asking for number of users");
		console.log(req.query);
		var q = req.query;
		if (q.hasOwnProperty('word') && !(q.hasOwnProperty('candidate'))) {
			var sqlQuery = "SELECT COUNT( * ) ct , support FROM tweets JOIN users ON user_id = tweet_user_id WHERE tweet_text REGEXP  '[[:<:]]"+q.word+"[[:>:]]' and support not like '' GROUP BY support;";
			connection.query(sqlQuery, function(err, rows, fields) {
				jsonRows = JSON.stringify(rows);
				console.log(jsonRows);
				res.json(rows);
			});

		}
		else if (q.hasOwnProperty('candidate') && q.hasOwnProperty('word')) {
                        var sqlQuery = "SELECT screen_name, follower_count, tweet_text, tweet_retweet_count FROM tweets JOIN users ON user_id = tweet_user_id WHERE tweet_text REGEXP  '[[:<:]]"+q.word+"[[:>:]]' and support like "+q.candidate+" ORDER BY follower_count desc limit 20;";
                        connection.query(sqlQuery, function(err, rows, fields) {
                                jsonRows = JSON.stringify(rows);
                                console.log(jsonRows);
                                res.json(rows);
                        });

                }
                else{
                        res.send("wrong request");
                }
	});
        

app.use('/api',router);
//app.listen(port);
http.createServer(app).listen(port);
// https.createServer(options,app).listen(https_port);
console.log("I'm listening on port "+port);
// console.log('Listening for https on port '+https_port);


