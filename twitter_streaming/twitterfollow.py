from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import json 
import time

import MySQLdb as mdb


trump_support = ["#TrumpTrain","#MakeAmericaGreatAgain",'#Trump2016','#VoteTrump']
bernie_support = ['#FeelTheBern','#Bernie2016','#Bernie2016']
hillary_support = ['#ImWithHer','#Hillary2016','#VoteHillary2016']



con = mdb.connect(host='localhost', user='#user',passwd='#password', db='tweet_db')
cur = con.cursor()

con.set_character_set('utf8')
cur.execute('SET NAMES utf8;')
cur.execute('SET CHARACTER SET utf8;')
cur.execute('SET character_set_connection=utf8;')

#consumer key, consumer secret, access token, access secret.


auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
#new_users = 0

def update_user(user,txt):
    """ Adds or updates a user to the list of users"""
    # no need to update user. we have information on them
    return;
    user_id = str(user['id'])
    username = user['screen_name'].replace("'","''")
    location = user['location']
    user_followers = str(user['followers_count'])
    user_friends = str(user['friends_count'])
    if (user_followers > 100000):
	print "tweet by ",username, "who has ",user_followers," follower"
    user_favorites = str(user['favourites_count'])
    user_verified = str(user['verified'])
    user_lang = user['lang']
    user_statuses = str(user['statuses_count'])
    user_created = str(user['created_at'])
    tstamp_user = time.strftime('%Y-%m-%d %H:%M:%S', time.strptime(user_created,'%a %b %d %H:%M:%S +0000 %Y'))

    description = ' '
    if 'description' in user.keys():
	if not (user['description'] == None):        
		description = user['description'].replace("'","''")
    
    # figure out who they support
    trump = False
    bernie = False
    hillary = False
    for msg in trump_support:
        trump = trump or (msg in txt)
    for msg in bernie_support:
	bernie = bernie or (msg in txt)
    for msg in hillary_support:
	hillary = hillary or (msg in txt)

    trump = int(trump)
    bernie = int(bernie)
    hillary = int(hillary)

    sql = "INSERT INTO users (user_id, screen_name, follower_count, user_created, verified, status_count, description, follow_trump, follow_clinton, follow_sanders) VALUES "
    sql += "("+user_id+ ",'" + username +"'," +user_followers +",'" +tstamp_user + "'," + user_verified + "," + user_statuses + ",'"+description+"',"+str(trump)+","+str(hillary)+","+str(bernie)+")"
    sql += " ON DUPLICATE KEY UPDATE follower_count="+user_followers+", status_count="+user_statuses+";"
    print trump,bernie,hillary,txt
	
 #   if new_users%100 == 0:
#	print "new user, total: ",new_users
 #   new_users +=1
    #print sql 
    cur.execute(sql)
    con.commit()

    return 
    pass

total_tweets = 0

def update_tweet(tweet,retweet):
    """ adds or updates a tweet to the list of tweets"""

  #  if total_tweets % 100 == 0:
#	print "total_tweets: ",total_tweets

#    print "Retweet",retweet
#    print tweet

    if 'text' in tweet.keys():
        # print 'hi'
        txt = tweet['text'].replace("'","''")
	txt.replace('"','""')
    else:
        return
    print txt
    id = str(tweet['id'])
    user_id = str(tweet['user']['id'])
    timestamp = str(tweet['created_at'])
    tweet_timestamp = time.strftime('%Y-%m-%d %H:%M:%S', time.strptime(timestamp,'%a %b %d %H:%M:%S +0000 %Y'))

    retweet_bool = '0'
    retweet_id = '0'

    if 'retweeted_status' in tweet.keys():
        # print data
        retweet_bool = '1'
        retweet_id = str(tweet['retweeted_status']['id'])
        # print 'hi2'
        # print tweet['retweeted_status']['text']
        retweet_txt = tweet['retweeted_status']['text'].replace("'","''")
        # print 'hi3'
        retweeted_user = tweet['retweeted_status']['user']

        # save information of retweeted account 
        update_user(retweeted_user,tweet['retweeted_status']['text'])
        # and update the original tweet as well (if existed)
        update_tweet(tweet['retweeted_status'],True)
        


    sql = "INSERT INTO tweets (prev_tweet,tweet_id, tweet_timestamp, tweet_user_id, tweet_text, tweet_retweet_count, tweet_retweet, tweet_retweet_id) "
    sql += "VALUES (3,"+id+",'"+tweet_timestamp+"',"+user_id+",'"+txt+"',0,"+retweet_bool+","+retweet_id+") "
    #if retweet == True:
    rt_count = 0
    if retweet == True:
        sql += "ON DUPLICATE KEY UPDATE tweet_retweet_count = "+str(tweet['retweet_count'])+";"
    else:
	sql += "ON DUPLICATE KEY UPDATE tweet_id="+id
    # print sql 
    cur.execute(sql)

    # print username,txt
    # print sql
    con.commit()

    pass 




class listener(StreamListener):

    def on_data(self, data):
        data = data.decode('utf-8')
        #print data
        #data goes here 
        tweet = json.loads(data)
	if 'text' in tweet.keys():
		txt = tweet['text'].replace("'","''").replace('"','""')
	else:
		return
        update_user(tweet['user'],txt)
        update_tweet(tweet,False)


        return(True)

    def on_error(self, status):
        print status

twitterStream = Stream(auth, listener())


# open the file for the candidate followers
tf = open('trump_usernames.tsv','r')
trump_followers = []
skip = True
for line in tf:
	if (skip==True):
		skip = False
		continue
	line = line.strip().split(' ')
	trump_followers.append(line[0])
skip = True
bernie_followers = []
for line in open('sanders_usernames.tsv','r'):
        if (skip==True):
                skip = False
                continue
	line = line.strip().split(' ')
	bernie_followers.append(line[0])
hillary_followers = []
skip = True
for line in open('clinton_usernames.tsv','r'):
        if (skip==True):
                skip = False
                continue
	line = line.strip().split(' ')
	hillary_followers.append(line[0])
all_followers = trump_followers+bernie_followers+hillary_followers
print "TOTAL FOLLOWERS:",len(all_followers)
twitterStream.filter(follow=all_followers)
