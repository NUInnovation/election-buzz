

# get tweet_text from followers of hillary
# tokenize
# count


# select tweet_text from tweets where date(tweet_timestamp)=today

import nltk
from nltk.tokenize import TweetTokenizer
import requests
from nltk.corpus import stopwords
import matplotlib.pyplot as plt 
from wordcloud import WordCloud,STOPWORDS
from datetime import date 


tknzr = TweetTokenizer(strip_handles=True, reduce_len=True)
stopwords_en = stopwords.words('english')

stopwords_en += ['via','rt','https','pm','http','u','w','see','go','every','hes','get','cant','thats','im','got','new']
politics = ['cruz','trump','ted','hillary','clinton','kasich','bernie','sanders','donald','think','vote']
politics += ['vote','gop','president','democrat','hillaryclinton','politics','candidate']
politics += ['votes','primary','primaries','dem','rep','republican']
nonPolitics = "obama state campaign indiana voter poll supporter supporters delegate rally party voter democratic "
nonPolitics +="state support delegate parties carly fiorina ted cruz state bill taxes caprimary primary "
nonPolitics +="primaries presidential politics california nominee general election republicans voter "
nonPolitics +="pledged independence dnc warren convention clintons national debt virginia west oregon states "
nonPolitics +="debate bush liberal rubio marco states paul ryan nebraska nevada win lose political ohio porland "
nonPolitics +="democrats us people wv de tax voters voting conservative delegates polls dems democratic congress presidential say bernies potus http htt hillarys trumps va "
nonPolitics = nonPolitics.split(' ')

otherWords = "dont want look one time need let still"
otherWords += " make america american great again know thank"
stopwords_en += politics+nonPolitics+(otherWords.split(' '))

for day in range(11,17):
	for candidate in ['HillaryClinton','BernieSanders','realDonaldTrump']:
		print "getting data for "+candidate
		today = date.today()
		year = today.year 
		month = today.month 
		# day = today.day-1
		reqString = 'candidate='+candidate+'&year='+str(year)+'&month='+str(month)+'&day='+str(day)
		print reqString
		r = requests.get('http://162.243.13.220:8081/api/cloud?'+reqString)
		print "got, change to json"
		rjson = r.json()

		print 'tokenizing'
		alltokens = []
		for i in range(len(rjson)):
			rjson[i]['tokens'] = tknzr.tokenize(rjson[i]['tweet_text'])
			alltokens += rjson[i]['tokens']

		print 'stemming '
		alltokens = [x.lower() for x in alltokens]
		alltokens = [x for x in alltokens if x.isalpha()==True and x not in stopwords_en]
		string_tokens = ' '.join(alltokens)
		scale = 0.6
		wc = WordCloud(
				max_words=500,
				stopwords=STOPWORDS,
				relative_scaling=scale,
				height=1080,
				width=1920
				).generate(string_tokens)
		# plt.imshow(wc)
		filestring = 'images/more_filtering/'+candidate+'_'+str(year)+'_'+str(month)+'_'+str(day)+'.png'
		wc.to_file(filestring)
		# break
	# break
		# plt.axis('off')
		# plt.show()

# print 'freqdist'
# fd = nltk.FreqDist(alltokens)
# fd.most_common(30)
# fd.plot(100, cumulative=False)
