from __future__ import division
import re 
import json 
import requests 
# from tweetAnalysis import *

num_tweets = {}

api_url = "http://162.243.13.220:8081/api/follower_tweets"

def match(tweet,words,words_topic):
    """ determines if there's a match between the two """
    
    for word in words_topic:
        word = word.lower()
        if (str(word) in tweet):
            # print topic,'\t',word,'- \t ',tweet
            return True
    return False
    # use sets 
    # set_words = set(words)
    # set_topic_words = set(words_topic)
    # if len(set_words.intersection(set_topic_words)) == 0:
    #     return False 
    # return True

def add_one(candidate_name, topic):
    """ adds one to the candidate name and topic that it corresponds"""
    
    if (candidate_name=='HillaryClinton'):
        index = 0
    if (candidate_name == 'realDonaldTrump'):
        index = 2
    if (candidate_name == 'BernieSanders'):
        index = 1
    topic_Dict = returnDict['Themes']
    for i in range(len(topic_Dict)):
        if (topic_Dict[i]['Topic'])==topic:
            returnDict['Themes'][i]['Data'][index]["Number"] += 1
            returnDict['Themes'][i]['Data'][index]["Tweets"] = returnDict['Themes'][i]['Data'][index]["Number"]/num_tweets[candidate_name]*100

# load categories first 
Topics = json.load(open('topic_dictionary.json','r'))['Topics']
big_topics = Topics.keys()
# for t in big_topics:
#     print Topics[t]

returnDict = {}
returnDict['Themes'] = []
for topic in big_topics:
    newTopic = {}
    newTopic['Data'] = []
    for candidate_name in ['HillaryClinton','BernieSanders','realDonaldTrump']:
        candidateDict = {}
        candidateDict['Name'] = candidate_name
        candidateDict['Number'] = 0
        candidateDict['Tweets'] = 0.0
        newTopic['Data'].append(candidateDict)  
    newTopic['Topic'] = topic
    returnDict['Themes'].append(newTopic)

print returnDict

# for each candidate, get 20,000 tweets 
for candidate_name in ['HillaryClinton','BernieSanders','realDonaldTrump']:
    
    
    # resp = requests.get(url=api_url+'?candidate='+candidate_name, timeout=None)
    # all_tweets = json.loads(res.text)
    file = open(candidate_name+'_own.txt')
    all_tweets = []
    first = True
    for line in file:
        if (first==True):
            first = False 
            continue
        tweet = line.strip()
        all_tweets.append(tweet)
    
    print "FOR CANDIDATE: ",candidate_name
    print len(all_tweets)
    candidateTotals = len(all_tweets)
    num_tweets[candidate_name] = candidateTotals
    # print all_tweets
    
    matches = 0
    for tweet in all_tweets:
        txt = tweet
        words = re.findall(r'\w+',txt)
        words = [x.lower() for x in words]
        
        flag = False
        for topic in big_topics:
            words_topic = Topics[topic]
            if match(tweet.lower(),words,words_topic):
                if (topic=='Security'):
                    if ('social security' in tweet.lower()):
                        # print "FALSE:",tweet.lower()
                        a = 1
                    else:
                        add_one(candidate_name,topic)
                        # print candidate_name,topic,tweet
                else:
                    add_one(candidate_name,topic)
                flag = True
        if (flag==True):
            matches += 1
        else:
            a = 1
            # print tweet
    print matches
                
print json.dumps(returnDict, separators=(',',':'))