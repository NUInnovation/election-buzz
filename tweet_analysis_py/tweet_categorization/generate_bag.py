import json 
import math
import string 


dictionary = {}
dictionary['Topics'] = {}

f = open('topic_dictionary.json','r')
dictionary = json.load(f)

for topic in ['Security','Education','Immigration','Women','Supreme Court','Healthcare','Tax']:
	print "TAKING TOPICS RELATED TO:"
	print topic 
	print '-----------'
	if topic in dictionary['Topics'].keys():
		words = [x.lower().rstrip() for x in dictionary['Topics'][topic]]
		print words
	else:
		words = []
	newWord = raw_input('Topic: '+topic+":").lower()
	while (newWord != ""):
		words.append(newWord)
		newWord = raw_input('Topic: '+topic+":")

	print "Words related to"+topic+":"
	print words 

	dictionary['Topics'][topic] = list(set(words))

result = json.dumps(dictionary, sort_keys=True,indent=4, separators=(',', ': '))

outfile = open('topic_dictionary.json','w')
outfile.write(result)
outfile.close()
