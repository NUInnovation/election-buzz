
# get followers

# from all the followers:
# get those that have <100000 followers and more than 100 and 
# account was created at least 1 year ago


trump_id = 25073877;
bernie_id = 216776631;
hillary_id = 1339835893;

for candidateId in [trump_id,bernie_id,hillary_id]:
	sql = "select * from users as U1 join followings as F1 on U1.user_id=F1.follower_id where F1.followed_id="+str(candidateId)+" and U1.verified=0 and U1.follower_count between 100 and 1000000 and year(U1.user_created)<=2014 order by U1.follower_count desc"
