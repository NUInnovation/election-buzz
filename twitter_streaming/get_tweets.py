import tweepy
import csv
from collections import Counter
import re
import time 
import random 
import json

from nltk.tokenize import TweetTokenizer
from nltk.tokenize import RegexpTokenizer
tknzr = TweetTokenizer()

# import all from tweets 
#from tweetAnalysis import *
from stemming.porter2 import stem

import MySQLdb as mdb


trump_support = ["#TrumpTrain","#MakeAmericaGreatAgain",'#Trump2016','#VoteTrump']
bernie_support = ['#FeelTheBern','#Bernie2016','#Bernie2016']
hillary_support = ['#ImWithHer','#Hillary2016','#VoteHillary2016']



//con = mdb.connect(host='localhost', user='####',passwd='####', db='tweet_db')
cur = con.cursor()

con.set_character_set('utf8')
cur.execute('SET NAMES utf8;')
cur.execute('SET CHARACTER SET utf8;')
cur.execute('SET character_set_connection=utf8;')

def update_user(user):
    """ Adds or updates a user to the list of users"""
    return;
    user_id = str(user['id'])
    username = user['screen_name'].replace("'","''")
    location = user['location']
    user_followers = str(user['followers_count'])
    user_friends = str(user['friends_count'])
    #if (user_followers > 100000):
	#print "tweet by ",username, "who has ",user_followers," follower"
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
        

    sql = "INSERT INTO users (streamed,user_id, screen_name, follower_count, user_created, verified, status_count, description) VALUES "
    sql += "(2,"+user_id+ ",'" + username +"'," +user_followers +",'" +tstamp_user + "'," + user_verified + "," + user_statuses + ",'"+description+"')"
    sql += " ON DUPLICATE KEY UPDATE follower_count="+user_followers+", status_count="+user_statuses+";"
	
    try:
    	cur.execute(sql)
    	con.commit()
    except mdb.IntegrityError, e: 
	print "Some integrity error",e
    except mdb.Error, e:
	print "Some standard error",e

    return 
    pass

def update_tweet(tweet,retweet):
    """ adds or updates a tweet to the list of tweets"""

    #print "Tweet",retweet
#    print tweet
    #print tweet
    if 'text' in tweet.keys():
        # print 'hi'
        txt = tweet['text'].encode('utf-8');
	
	txt = txt.replace("'","")
	txt = txt.replace('"','')
	#print txt
	# making sure now errors in ' or " put together
	#txt.replace('"','')
	#txt.replace("'","")
    else:
	print "Returning!"
        return
    id = str(tweet['id'])
    user_id = str(tweet['user']['id'])
    timestamp = str(tweet['created_at'])
    #print user_id,id,txt
    tweet_timestamp = time.strftime('%Y-%m-%d %H:%M:%S', time.strptime(timestamp,'%a %b %d %H:%M:%S +0000 %Y')) 
    retweet_bool = '0'
    retweet_id = '0'
    retweet_count = 0;
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
	retweet_count = tweet['retweet_count']
        

    
    sql = "INSERT INTO tweets (prev_tweet,tweet_id, tweet_timestamp, tweet_user_id, tweet_text, tweet_retweet_count, tweet_retweet, tweet_retweet_id) "
    sql += "VALUES (1,"+id+",'"+tweet_timestamp+"',"+user_id+",'"+txt+"',"+str(retweet_count)+","+retweet_bool+","+retweet_id+") "
    #if retweet == True:
    rt_count = 0
    if retweet == True:
        sql += "ON DUPLICATE KEY UPDATE tweet_retweet_count = "+str(tweet['retweet_count'])+";"
    else:
	sql += "ON DUPLICATE KEY UPDATE tweet_id="+id
    
    #print sql
    try:
        cur.execute(sql)
    	con.commit()
    except mdb.IntegrityError, e:
        print "Some integrity error",e
    except mdb.Error, e:
        print "Some standard error",e
    #print user_id,txt
    # print sql

    pass 




def get_all_tweets(screen_name):
	print "Getting tweets for "+screen_name,
	#most recent 3000 tweets
	alltweets = []

	try:
		new_tweets = api.user_timeline(screen_name = screen_name, count=200)
	except tweepy.error.TweepError,e:
		print "ERROR GETTING USER - PROBABLY DOES NOT EXIST",e
		return
	except:
		print "SOMETHING ELSE"
	alltweets.extend(new_tweets)
	oldest = alltweets[-1].id - 1

	while len(new_tweets)>0:
		#time.sleep(1);
		try:
                	new_tweets = api.user_timeline(screen_name = screen_name, count=200,max_id=oldest)
        	except tweepy.error.TweepError,e:
                	print "ERROR GETTING USER - PROBABLY DOES NOT EXIST",e
                	break
        	except:
                	print "SOMETHING ELSE"
		alltweets.extend(new_tweets)
		#print "Got %s new tweets" % (len(new_tweets))
		#if (len(new_tweets) < 100):
			#print "Waiting 10 sec"
			#time.sleep(10)
		oldest = alltweets[-1].id - 1 
		print "...%s tweets downloaded so far" % (len(alltweets))
		if len(alltweets)>=3000:
			break
	print "Total tweets:",len(alltweets)
	for l,tweet in enumerate(alltweets):
		#if (l%100==0):
		#    print l," out of ",len(alltweets)
		#print l,tweet.text.lower()
		#print tweet._json
		tweet = tweet._json
		#tweet = tweet.decode('utf-8')
		#print tweet
		#tweet = json.loads(tweet)
		update_tweet(tweet,False)
		#time.sleep(.5)






		# txt = tweet.text.lower()
		# # take out urls form the tweet
		# txt = re.sub(r"http\S+", "", txt)
		# txt_tokens = tknzr.tokenize(txt)
		# txt_no_mentions = re.sub(r'@\S+','',txt)
		# words_only1 = tknzr.tokenize(txt_no_mentions)
		# words_only = [x for x in words_only1 if twitter_regexp.search(x)]
		# relevant_only = [str(x) for x in words_only if x not in terrier]
		# # print relevant_only
		# stemmed_only = [stem(x, 0, len(x) - 1) for x in relevant_only]
		# # print stemmed_only
		# # print "Tweet: ",tweet.text 

		# # add to list of tweets 
		# tweetList.append(Tweet(tweet._json["id"], txt, relevant_only, stemmed_only, screen_name))
		
		# add to word vector 

if __name__ == '__main__':

	# accept hashtags and any words
	twitter_regexp = re.compile(r"^[a-zA-Z#][a-zA-Z0-9.,':]+$")
	# consumer, consumer secret, acces token and secret

	auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
	auth.set_access_token(access_token, access_token_secret)

	api = tweepy.API(auth)
	print "Connected "
	# stemmer = PorterStemmer()


	trumpFollowers = []
	trumpFile = open('trump_followers.tsv','r')
	jump = True
	for line in trumpFile:
		if (jump==True):
			jump = False
			continue
		Line = line.strip().split('\t')
		if (int(Line[0])==67210156):
			continue
		trumpFollowers.append(Line[1])
	trumpFollowers = trumpFollowers[1:]
	clintonFollowers = []
	clintonFile = open('clinton_followers.tsv','r')
	for line in clintonFile:
		Line = line.strip().split('\t')
		clintonFollowers.append(Line[1])
	clintonFollowers = clintonFollowers[1:]
	sandersFollowers = []
	sandersFile = open('sanders_followers.tsv','r')
	for line in sandersFile:
		Line = line.strip().split('\t')
		sandersFollowers.append(Line[1])
	sandersFollowers = sandersFollowers[1:]
	print "Followers:",len(trumpFollowers),len(clintonFollowers),len(sandersFollowers);
	print "GETTING ALL TWEETS"
	print "First, Trump"
	time.sleep(5)
	for i,follower in enumerate(trumpFollowers):
		if (i<0):
		    continue
		print '\t',i,'\t',follower
		get_all_tweets(follower);
		time.sleep(65);
	print "Hillary now"
	for i,follower in enumerate(clintonFollowers):
		#if (i<250):
		#    continue
		print '\t',i,'\t',follower
		get_all_tweets(follower);
		time.sleep(65);
	print "Sanders"
	for i,follower in enumerate(sandersFollowers):
		print '\t',i,'\t',follower
		get_all_tweets(follower);
		time.sleep(65);
	# get_all_tweets("realDonaldTrump")
	# get_all_tweets("JohnKasich")
	# get_all_tweets("HillaryClinton")
	# get_all_tweets("BernieSanders")
	# get_all_tweets("TedCruz")

	# now split testing and training
	# random.shuffle(tweetList)
	# split = len(tweetList) / 15

	# trainSet, testSet = tweetList[:split], tweetList[split:]

	# outtest = open('longtest.csv','w')
	# outstemtest = open('longstem.csv','w')

	# resultTxt = '{ "Tweets": [\n'
	# for tweet in trainSet:
	# 	resultTxt += tweet.to_JSON()+',\n'
	# resultTxt = resultTxt[:-2]+'\n] \n }'
	# outtest.write(resultTxt)

	# outtest.close()
	# outstemtest.close()


	#now we need to 
