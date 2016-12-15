<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>HTACCESS HELPER</title>
	<link rel="stylesheet" href="css/style.css">
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="plugin/jquery-md5/jquery-md5.min.js"></script>
	<script src="app.js"></script>
</head>
<body>

<div id="toolbar">
	<a id="logo" href="#">HTACCESS</a>
	<a id="save_btn" href="#">SAVE</a>
	<a id="open_btn" href="#">OPEN</a>
	<a href="#404" class="func-btn">404 Generator</a>
	<a href="#301" class="func-btn">301 Generator</a>
</div>

<div id="left" class="box">
	<!-- document -->
	<div id="doc_form" class="func-form">
		You can use this tools to manage the following setup for htaccess:<br>
		<ol>
			<li>404 Error Document re-direction</li>
			<li>301 URL re-direction</li>
			<li>SAVE button can save currect project to an project file</li>
			<li>If you have save a project file, you can open it to re-edit your htaccess file</li>
		</ol>
	</div>

	<!-- 301 -->
	<div id="301_form" class="func-form">
		<div class="add box">
			<div class="row">
				<label for="">Old</label>
				<input id="old" type="text" class="addField box" >
			</div>
			<div class="row">
				<label for="">New</label>
				<input id="new" type="text" class="addField box">
			</div>
			<div class="func">
				<button id="add" class="box">Add</button>
			</div>
		</div>
		<div id="list" class="box"></div>
	</div>
	
	<!-- 404 -->
	<div id="404_form" class="func-form">
		<div class="add_404 box">
			<div class="row">
				<label for="">404 Path</label>
				<input id="404path" type="text" class="addField box" >
			</div>
			<div class="func">
				<button id="add404" class="box">Set</button>
			</div>
		</div>
	</div>

</div>

<div id="right" class="box">
	<textarea id="output" class="box" readonly></textarea>
</div>

<!-- save from -->
<form id="save_form" action="generate/save.php" method="post"><input class="data" type="hidden" name="data"></form>

<!-- open form -->
<form id="open_form" action="generate/open.php" method="post" enctype="multipart/form-data"><input class="data" type="file" name="data"></form>
	
</body>
</html>