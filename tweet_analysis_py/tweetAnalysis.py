from __future__ import division
import time 
import math 
import nltk 
from copy import deepcopy
import json 

class Tweet(object):
	""" an object that holds information about the tweet, including the vector """
	def __init__(self,id=0,text='',words='', stems='', username='xx',tweet=''):
		self.tweet = tweet 
		self.id = id
		self.text = text
		self.words = words
		self.stems = stems
		self.username = username 
		self.vector = None

	def to_JSON(self):
		return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)

class TweetVector(object):
	""" the tweet vector based on dictionary of words available in all tweets """
	def __init__(self,vector,magnitude,length):
		self.vector = vector 
		self.magnitude = magnitude 
		self.length = len(vector)


class WordVector(object):
	""" Stores an ordered list of all the words in the wordVector """
	def __init__(self):
		self.wordSet = set()

	def add_words(self, tweetWords):
		""" add list of W words to the ordered list"""

		for word in tweetWords:
			self.wordSet.add(word)



	def __str__(self):
		""" prints the words in a sorted list """
		ret = "Number of elements: "+str(len(self.wordSet))+"\n"
		ret += str(sorted(self.wordSet))
		return ret 

	def generate_vector(self, words):
		""" generates a vector in binary <1,0,0,1...> given an 
			unordered list of words as input
			and returns that vector 
		"""

		# sort it first
		sortedList = sorted(self.wordSet)
		# now return a vector and its magnitude
		vector = [int(x in words) for x in sortedList]
		return TweetVector(vector, sum(vector), len(self.wordSet))



class Cluster(object):
	""" Cluster contains a center of mass and a list of tweets it relates to """

	def __init__(self,vector_length, id):
		self.tweets = []
		self.vector_length = vector_length
		self.sum_vectors = [0.0]*vector_length
		self.num_vectors = 0
		self.centroid = [0.0]*vector_length
		self.words = []
		self.id = id
		self.active = True

	def update_centroid(self):
		""" updates centroid of Cluster """
		self.centroid = [x/self.num_vectors for x in self.sum_vectors]


	def add_tweets(self, tweetList):
		""" Adds a list of tweets to the current tweet database
			It also re-calculates the center of gravity after all the tweets are added
		"""

		flag = False 
		# print tweetList
		for each in tweetList:
			# print each.vector.vector
			if len(each.vector.vector) == self.vector_length:
				self.tweets.append(each)
				self.words += each.stems
				self.num_vectors += 1
				# and add to each element in vector to running sum 
				for i,v in enumerate(self.sum_vectors):
					self.sum_vectors[i] += each.vector.vector[i]

			else:
				flag = True

		self.update_centroid()
		if (flag == True):
			print "ERROR - At least one tweet had wrong vector length"


def vector_distance(v1,v2):
	""" returns the distance between 2 different vectors
		Uses the dot-product of normalized vectors
	"""
	if (v1 == None) or (v2 == None):
		print "ERROR: One of vectors does not exist"
		return -1 
	if (len(v1) != len(v2)):
		print "ERROR: Different lengths"
		return -1 

	dot_product = sum(p*q for p,q in zip(v1, v2))
	result = dot_product / (len(v1) * len(v2))

	return result 

def dot_product(v1, v2):
	if (len(v1) != len(v2)):
		return -1 

	return sum(p*q for p,q in zip(v1,v2))

def get_entropy(v):
	""" returns the percentage of fields with more than 10 elements """

	more_than_10 = len([x for x in v if x>=10])
	return more_than_10/len(v)

	# total = sum(v)
	# entropy = 0.0 

	# for elem in v:
	# 	entropy += -1*(elem/total)*(math.log(elem/total))

	# return entropy 


class HierarchicalClustering(object):
	""" Class that takes over the clustering part of the task """

	def __init__(self, allTweets, vector_length):
		self.level = 0
		self.clusters = []
		self.clustersDict = {}
		self.start_time = time.time()
		self.vector_length = vector_length
		self.distances = {}
		self.maxId = 0
		for tweet in allTweets:
			c = Cluster(vector_length,self.maxId)
			self.maxId += 1
			# print "adding tweet to create own cluster "
			c.add_tweets([tweet])
			self.add_cluster(c)
			# self.clusters.append(c)
		self.entropy = 0.0

		return 

	def __str__(self):

		lengths = [x.num_vectors for x in self.clusters]
		max_size = max(lengths)
		min_size = min(lengths)
		avg_size = sum(lengths) / len(lengths)
		# 25, 50, 75 % of each 

		

		ret = "Hierarchical Clustering "
		ret += "\nLevel: "+str(self.level)+ '\n'
		ret += 'Clusters: '+str(len(self.clusters)) + '\n'
		ret += 'Max size: '+str(max_size) + '\n'
		ret += 'Min size: '+str(min_size) + '\n'
		ret += 'Mean size: '+str(mean(lengths)) + '\n'
		ret += 'Median size:'+str(median(lengths)) + '\n'
		ret += '10% '+str(quantile(lengths, .1))+'\n'
		ret += '25% '+str(quantile(lengths,.25))+'\n'
		ret += '33% '+str(quantile(lengths,.33))+'\n'
		ret += '50% '+str(quantile(lengths,.50))+'\n'
		ret += '66% '+str(quantile(lengths, .66))+'\n'
		ret += '75% '+str(quantile(lengths, .75))+'\n'
		ret += '90% '+str(quantile(lengths, .90))+'\n'
		ret += 'Vector Length: '+str(self.clusters[0].vector_length) + '\n'

		self.entropy = get_entropy(lengths)
		ret += 'Entropy: '+str(self.entropy)+'\n'


		
		return ret
		pass 

	def add_cluster(self, c):
		""" adds a new cluster to the total clusters. It also calculates distances between
			that cluster and everything else before it 
		"""

		self.clustersDict[c.id] = c 
		print "adding cluster ",self.maxId,
		now = time.time()

		for previous_c in self.clusters:
			self.distances[(previous_c.id, c.id)] = dot_product(previous_c.centroid, c.centroid)
		self.clusters.append(c)

		print "time: ",(time.time() - now)," seconds / ",((time.time() - self.start_time)/60)," minutes from start"


	def merge_clusters(self,C1_id,C2_id):
		""" Merges 2 clusters into one, calculating center of gravity and appending tweet list
			Adds it to the dictionary of clusters 
		"""

		C1 = self.clustersDict[C1_id]
		C2 = self.clustersDict[C2_id]

		newCluster = Cluster(self.vector_length, self.maxId)
		self.maxId += 1
		newCluster.add_tweets(C1.tweets)
		newCluster.add_tweets(C2.tweets)
		self.clustersDict[newCluster.id] = newCluster

		# now we need to reset the clusters with id c1 and c2 
		self.clusters.remove(C1)
		self.clusters.remove(C2)
		self.clustersDict[C1.id] = None 
		self.clustersDict[C2.id] = None

		# and remove from the distance vector
		for c in self.clusters:
			if (c.id<C1.id):
				self.distances[(c.id, C1.id)] = 0 
			else:
				self.distances[(C1.id, c.id)] = 0 

			if (c.id < C2.id):
				self.distances[(c.id, C2.id)] = 0 
			else:
				self.distances[(C2.id, c.id)] = 0
		if C1.id<C2.id:
			self.distances[(C1.id, C2.id)] = 0 
		else:
			self.distances[(C2.id, C1.id)] = 0

		# and calculate distances
		print "Calculating all distances to new vector "
		for c in self.clusters:
			self.distances[(c.id,newCluster.id)] = dot_product(c.centroid, newCluster.centroid)
		self.clusters.append(newCluster)



	def step(self):
		""" Goes through one more step of clustering"""

		self.level += 1 


		# need to find the minimum, so compare all the clusters
		print "Finding best"
		# for c1 in self.clusters:
		# 	for c2 in self.clusters:
		# 		if c1.id>c2.id:
		# 			if (c1.active == True and c2.active == True):
		# 				if (c1.id,c2.id) not in distances.keys():
		# 					distances[(c1.id, c2.id)] = dot_product(c1.centroid, c2.centroid)


		# for i in range(len(self.clusters)):
		# 	if (i%20==0):
		# 		print i,"/",len(self.clusters)
		# 	for j in range(len(self.clusters)):
		# 		if j>i:
		# 			# valid. anything else would be a repetition
		# 			distances[(i,j)] = dot_product(self.clusters[i].centroid, self.clusters[j].centroid)
		# 			# print i,j,":",distances[(i,j)]

		besta, bestb = max(self.distances, key=self.distances.get)
		print "Merge : ",besta,bestb,self.distances[(besta,bestb)]

		# generate new cluster with clusters id = besta and id=bestb
		self.merge_clusters(besta, bestb)		

		# newClusters = [self.clusters[i] for i in range(len(self.clusters)) if (i != besta and i != bestb)]
		# newClusters.append(merge_clusters(self.clusters[besta], self.clusters[bestb]))

		print "Sort by number of vectors in total (decreasing) "
		self.clusters = sorted(self.clusters, key=lambda x: x.num_vectors, reverse=True)

		# self.clusters = None 
		# self.clusters = newClusters 

	def save_clusters(self):
		""" Saves the current cluster to a file that has clusters one by one 
			as well as most popular words in that cluster """

		# outf = file('cluster_results/clusters_level'+str(self.level)+'.txt','w')
		
		txt = str(self)
		txt += '\n\n'
		for c in self.clusters[:30]:
			# use the list of all words in the cluster
			# arrange by frequency 
			fdist = nltk.FreqDist(c.words)
			txt += " --------------------------------- \nCluster\n"
			txt += "Total tweets: "+str(c.num_vectors)+','+str(len(c.tweets))+'\n'
			# txt += str(fdist.most_common(30))+'\n'
			# for tweet in c.tweets:
			# 	txt += str(tweet.stems) + '\n'

		# print txt
		# outf.write(txt)
		print self
		# outf.close()

	def operate_until(self,min_clusters):
		""" runs step() and save_clusters() until stopping criteria = min number of clusters """

		self.bestClusters = None 
		self.bestEntropy = 0.0

		while(len(self.clusters) > min_clusters):
			print "++++++++++++++++++++++++++++"
			print "++++++++++++++++++++++++++++"
			print "++++ STEP "+str(self.level)+"++++++"
			print (time.time() - self.start_time)/60," minutes after "
			self.step()
			self.save_clusters()
			newEntropy = self.entropy
			if (newEntropy >= self.bestEntropy):
				print "Improvement: ",(self.bestEntropy-newEntropy)
				self.bestClusters = self.clusters
				self.bestEntropy = newEntropy
			else:
				print "Stopped improving "
				break






def mean(x):
    return sum(x)/len(x)


def median(v):
    """finds the middle-most value of v"""
    n = len(v)
    sorted_v = sorted(v)
    midpoint = n // 2

    if (n % 2) == 1:
        #if odd, return the middle value
        return sorted_v[midpoint]
    else:
        lo = midpoint - 1
        hi = midpoint
        return (sorted_v[lo] + sorted_v[hi]) / 2


def quantile(x, p):
    """ returns the p-th percentile of x"""
    p_index = int(p * len(x))
    return sorted(x)[p_index]


def mode(x):
    """returns most common value"""
    counts = Counter(x)
    max_count = max(counts.values())
    return [x_i for x_i, count in counts.iteritems()
            if count == max_count]







