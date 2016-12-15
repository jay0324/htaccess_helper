<?php
	if ($_FILES['data']['error'] == UPLOAD_ERR_OK && is_uploaded_file($_FILES['data']['tmp_name'])) { //checks that file is uploaded
  		echo file_get_contents($_FILES['data']['tmp_name']); 
	}

	// header("Content-Description: File Transfer");
	// header("Content-Disposition: attachment; filename=\"".$fileName."\"");
	// echo $_POST['data'];
?>