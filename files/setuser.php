<?php
	include 'connect.php';
	
	$username = $_POST['user'];
	$oldusername = $_POST['olduser'];

	$getusernames = 'SELECT * FROM babbler_users WHERE user=\''.$username.'\';';

	$results = mysqli_query($db,$getusernames)
	or die('Error querying database!');
	
	if(mysqli_num_rows($results) == 0 && $username != "") {
		$query = 'INSERT INTO babbler_users(user) VALUES(\''.$username.'\');';
		mysqli_query($db,$query)
		or die('Error adding user do database!');
	} else {
		echo 0;
	}
	// deletes user being used from table
	if ($oldusername != "" && mysqli_num_rows($results) == 0) {
		$delolduser = 'DELETE FROM babbler_users WHERE user=\''.$oldusername.'\';';
		mysqli_query($db,$delolduser)
		or die('Error deleting old username!');
	}
	mysqli_close($db);
?>