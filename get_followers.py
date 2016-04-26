# -- CREATE TABLE IF NOT EXISTS `tweet_db`.`followings` (
# --   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
# --   `follower_id` INT NULL,
# --   `followed_id` INT NULL,
# --   `retweet_count` INT NULL,
# --   `followed_count` INT NULL,
# --   PRIMARY KEY (`id`))
# -- ENGINE = InnoDB;

# -- ----

# select user_id, count(*), username from tweets where username like 'realDonaldTrump' or username like 'JohnKasich' or username like 'TedCruz' or username like 'HillaryClinton' or username like 'BernieSanders' group by user_id;

# Request data by using curl (get 5000)
# Add to follower db all the id 

execfile('connect.py')

#consumer key, consumer secret, access token, access secret.

trump_id = 25073877
bernie_id = 216776631
ted_cruz_id = 23022687
kasich_id = 18020081
hillary_id = 1339835893


api = tweepy.API(auth)


for a in [('realDonaldTrump',trump_id),('BernieSanders',bernie_id),('TedCruz',ted_cruz_id),('HillaryClinton',hillary_id),('JohnKasich',kasich_id)]:
	ids = []
	candidate = a[0]
	candidate_id = a[1]
	saved = 0
	for page in tweepy.Cursor(api.followers_ids, screen_name=candidate).pages():
	    ids.extend(page)
	    print "IDs collected: ",str(len(ids))+" for "+candidate
	    # print page
	    for userid in page:
	    	sql = "INSERT IGNORE INTO followings (follower_id, followed_id) VALUES ("+str(userid)+","+str(candidate_id)+")";
		#  ON DUPLICATE KEY UPDATE SET followed_id="+str(candidate_id)+";"
	    	#print sql
	    	cur.execute(sql)
	    con.commit()
	    print "sleep 60"
	    time.sleep(20)
	    print "sleep 40"
	    time.sleep(20)
	    print "sleep 20"
	    time.sleep(30)
	    if (len(ids)>200000):
	    	break

print len(ids)
