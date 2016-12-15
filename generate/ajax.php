<?php
	$fileName = "0.htaccess";
	header("Content-Description: File Transfer");
	header("Content-Disposition: attachment; filename=\"".$fileName."\"");
	echo $_POST['data'];
?>