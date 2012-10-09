<?php
    include 'connect.php';
	
	$username = $_POST['user'];
	$msg = $_POST['message'];

	$query = "INSERT INTO babbler (user,text) VALUES('$username','$msg')";
	mysqli_query($db,$query)
	or die('Error querying database!');
	mysqli_close($db);
?>