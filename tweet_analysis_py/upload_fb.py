from __future__ import division
import re
import random
import time 
print "Importing libraries"
from tweetAnalysis import *
import json
import time 
from firebase import Firebase 

fb_url = 'http://electionbuzz.firebaseio.com/tweets'
fb = Firebase(fb_url)

# fb.put
# fb.patch
# fb.push


testfile = open('../test1.csv','r')

for line in lines:


