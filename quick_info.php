<?php 
// get data for how many tweets we have 
$sql = "SELECT COUNT(*) ct from tweets;";
$result = $conn->query($sql);

if ($result->num_rows > 0)
{
	$row = $result->fetch_assoc();
	echo " Number of tweets: ". $row['ct']." <br>";
}


$sql = "SELECT COUNT(*) ct from users;";
$result = $conn->query($sql);

if ($result->num_rows > 0)
{
	$row = $result->fetch_assoc();
	echo " Number of users: ". $row['ct']." <br>";
}

$sql = "SELECT COUNT(*) ct from users;";
$result = $conn->query($sql);

if ($result->num_rows > 0)
{
	$row = $result->fetch_assoc();
	echo " Number of users: ". $row['ct']." <br>";
}


///// 

$trump_id = 25073877
$bernie_id = 216776631
$ted_cruz_id = 23022687
$kasich_id = 18020081
$hillary_id = 1339835893

$sql = "SELECT COUNT( * ) ct, followings.followed_id id FROM users JOIN followings ON users.user_id = followings.follower_id GROUP BY followings.followed_id ";

if ($result->num_rows > 0)
{
	while ($row = $result->fetch_assoc())
	{
		$row = $result->fetch_assoc();
		if ($row['id']==$trump_id){
			echo "Followers for Trump: ".$row['ct']."<br>";
		}
		if ($row['id']==$hillary_id){
			echo "Followers for Hillary: ".$row['ct']."<br>";
		}
		if ($row['id']==$bernie_id){
			echo "Followers for Bernie: ".$row['ct']."<br>";
		}
		if ($row['id']==$kasich_id){
			echo "Followers for Joh Kasich: ".$row['ct']."<br>";
		}
		if ($row['id']==$ted_cruz_id){
			echo "Followers for Ted Cruz: ".$row['ct']."<br>";
		}

	}

}

?>