execfile('connect.py')

def update_user(user):
    """ Adds or updates a user to the list of users"""

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
        

    sql = "INSERT INTO users (user_id, screen_name, follower_count, user_created, verified, status_count, description) VALUES "
    sql += "("+user_id+ ",'" + username +"'," +user_followers +",'" +tstamp_user + "'," + user_verified + "," + user_statuses + ",'"+description+"')"
    sql += " ON DUPLICATE KEY UPDATE follower_count="+user_followers+", status_count="+user_statuses+";"
	
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

    print "Tweet",retweet
#    print tweet

    if 'text' in tweet.keys():
        # print 'hi'
        txt = tweet['text'].replace("'","''")
	txt.replace('"','""')
    else:
        return
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
        update_user(retweeted_user)
        # and update the original tweet as well (if existed)
        update_tweet(tweet['retweeted_status'],True)
        


    sql = "INSERT INTO tweets (tweet_id, tweet_timestamp, tweet_user_id, tweet_text, tweet_retweet_count, tweet_retweet, tweet_retweet_id) "
    sql += "VALUES ("+id+",'"+tweet_timestamp+"',"+user_id+",'"+txt+"',0,"+retweet_bool+","+retweet_id+") "
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

        update_user(tweet['user'])
        update_tweet(tweet,False)


        return(True)

    def on_error(self, status):
        print status

twitterStream = Stream(auth, listener())
twitterStream.filter(track=["@realDonaldTrump","@TedCruz","@HillaryClinton","@BernieSanders",'@JohnKasich'])
        
