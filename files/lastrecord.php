<?php
	include 'connect.php';
	$query = "SELECT id FROM babbler WHERE id=(SELECT MAX(id) FROM babbler)";
	$result = mysqli_query($db,$query)
	or die('Error querying database!');
	$row = mysqli_fetch_row($result);
	mysqli_close($db);
	echo $id=json_encode(array("id" => $row[0]));
?>