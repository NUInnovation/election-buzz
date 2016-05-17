from __future__ import division
import re
import random
import time 
print "Importing libraries"
from tweetAnalysis import *
import json
import csv 
from collections import Counter
import nltk 
import time 
from nltk.tokenize import RegexpTokenizer 
from stop_words import get_stop_words
# import lda 

# from gensim import corpora, models 
# import gensim 
# from nltk.stem.porter import PorterStemmer 
# p_stemmer = PorterStemmer()

# Author: Bruno Peynetti

# the tweets were scraped and saved in the corresponding files
# test<Stem>.csv and train<Stem>.csv 

topic_file = 'topic_dictionary.json'


if __name__ == '__main__':



	print "Loading and creating vector for these words"
	tf = open(topic_file,'r')
	topicDictionary = json.load(tf)

	wordDict = WordVector()
	topicVectors = []
	for topic in topicDictionary['Topics']:
		wordDict.add_words(topicDictionary['Topics'][topic])


	for topic in topicDictionary['Topics']:
		newTweet = Tweet(username=topic, stems=topicDictionary['Topics'][topic])
		newTweet.vector = wordDict.generate_vector(newTweet.stems)
		topicVectors.append(newTweet)
		print newTweet.vector.vector

	# now creating the cluster vectors to test against:
	testfile = open('../test1.csv','r')

	testVectors = []
	testTweets = []

	candidates = []
	tweets_by_candidate = {}

	for line in testfile:
		splitLine = line.split(',')
		splitLine = [x.strip() for x in splitLine]
		username,stems = splitLine[0], splitLine[1:]
		testTweets.append(Tweet(username=username, stems=stems))
		candidates.append(username)
	candidates = set(candidates)

	# print tweets_by_candidate
	for c in candidates:
		tweets_by_candidate[c] = 0  

	for tweet in testTweets:
		tweets_by_candidate[tweet.username] += 1
 


	count = {}
	for topic in topicDictionary['Topics']:
		count[topic] = {}
		for person in candidates:
			count[topic][person] = 0

	print count 

	total = len(testTweets)
	for t in testTweets:
		t.vector = wordDict.generate_vector(t.stems)
		# figure out the distances to each of the topicVectors
		distances = [[vector_distance(t.vector.vector,x.vector.vector), x.username, t.username] for x in topicVectors]
		distances = sorted(distances, key=lambda x:x[0], reverse=True)
		for m in distances:
			if (m[0] == 0):
				continue 
			else:
				count[m[1]][m[2]] += 1
			# break

		# if (distances[0][0]==0):
		# 	a = 0
		# else:
		# 	# print distances[0][1],distances[0][2],
		# 	# print "TWEET: ",t.stems
		# 	# 1 = topic
		# 	# 2 = candidate
		# 	count[distances[0][1]][distances[0][2]] += 1

	outfile = open('tweetdata1.json','w')


	jsonObj = {}
	jsonObj["Themes"] = []
	i=0
	for topic in topicDictionary['Topics']:
		newTheme = {}
		newTheme["Topic"] = topic 

		n = []
		for c in candidates:
			n.append({"Name":c, "Tweets":(count[topic][c]*100/tweets_by_candidate[c]), 
						"Number": count[topic][c]
					});
		newTheme["Data"] = n

		jsonObj['Themes'].append(newTheme)


	json.dump(jsonObj,outfile, sort_keys=True, indent=4, separators=(',',': '))
	print count
	# print " out of ",total

		# print distances





