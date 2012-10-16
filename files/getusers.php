<?php
	include 'connect.php';

	$query = "SELECT user FROM babbler_users";
	$results = mysqli_query($db,$query)
	or die('Error querying database!');
	$data = mysqli_fetch_all($results);
	mysqli_close($db);
	echo json_encode($data);
?>