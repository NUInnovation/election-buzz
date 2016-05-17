from __future__ import division
print "loading"
import re 
import random
from tweetAnalysis import *
from collections import Counter 
import nltk 
from nltk.tokenize import RegexpTokenizer
from stop_words import get_stop_words
import json
print "Loaded!"


tweets = json.load(open('electionbuzz-export.json','r'))

Categories = tweets['Categories']
TaggedTweets = [x for x in tweets['Tweets'] if 'Categories' in x.keys()]

# now create masses to grab all the important vectors

Topics = json.load(open('topic_dictionary.json','r'))['Topics']

big_topics = Topics.keys()

# load a bunch of tagged tweets and make vectors of categories
wordDict = WordVector()
TaggedTweetObjs = []

for tweet in TaggedTweets:
	stems = tweet['stems']
	cats = tweet['Categories']
	words = tweet['words']
	TaggedTweetObjs.append(Tweet(stems=words,
		username=tweet['username'],text=tweet['text'],
		words=tweet['words'],id=tweet['id'],categories=tweet['Categories']))
	# now add stems to word dictionary
	wordDict.add_words(stems)

wordSetLength = len(wordDict.wordSet)

# then make the category clusters to add tweets into 
categoryClusters = {}
i = 0
for bt in big_topics:
	categoryClusters[bt] = Cluster(wordSetLength,i)
	i+=1

# now add to each the ones it should go through 
for tweet in TaggedTweetObjs:
	tweet.vector = wordDict.generate_vector(tweet.stems)
	cats = tweet.categories 
	flag = False
	for bt in big_topics:
		if len(set(tweet.categories).intersection(set(Topics[bt])))>0:
			categoryClusters[bt].add_tweets([tweet])
			flag = True
	# if (flag == False):
		# print "TWEET NOT CLASSIFIED:",tweet.text

print "Vector length: ",wordSetLength
print "Printing cluster size:"
total_tweets = 0
for key in categoryClusters:
	print '\n\n\n'
	print key,": has ",categoryClusters[key].num_vectors," vectors "
	total_tweets += categoryClusters[key].num_vectors
	# for t in categoryClusters[key].tweets:
		# print "TWEET:",t.username," - ",t.text
	# print categoryClusters[key].centroid
	print Counter(categoryClusters[key].words).most_common(20)

print "total tweets:",total_tweets


# print "NOW GETTING TWEETS "
# time.sleep(2)

# trainTweets = []
# tweets = json.load(open('../longtest.json','r'))["Tweets"]
# for t in tweets:
# 	id = t['id']
# 	stems = t['stems']
# 	username = t['username']

# 	newTweet = Tweet(id=id, stems=stems, text=t['text'],username=username)
# 	# print "Stems:",stems
# 	newTweet.vector = wordDict.generate_vector(stems)
# 	# print "Vector length: ",len(newTweet.vector.vector)

# 	category = get_best_category(newTweet,categoryClusters)
# 	newTweet.category = category

# 	print "CAT: ",category," -- ",t['text']















