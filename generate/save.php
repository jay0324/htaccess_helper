<?php
	$fileName = "hthelper.json";
	header("Content-Description: File Transfer");
	header("Content-Disposition: attachment; filename=\"".$fileName."\"");
	echo urldecode($_POST['data']);
?>