<?php
	include 'connect.php';
	$id = $_GET['id'];
	$query = "SELECT id,user,text FROM babbler WHERE id > ".$id;
	$result = mysqli_query($db,$query)
	or die('Error querying database!');
	$values = array();
	while($row = mysqli_fetch_array($result)) {
		$values[]=array(
			'id' => $row['id'],
			'user' => $row['user'],
			'message' => $row['text']
		);	
	}
	mysqli_close($db);
	echo json_encode($values);
?>