<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<title>Badge Browser</title>
	<link href="styles.css" rel="stylesheet" type="text/css" />
	<meta charset="utf-8"/>
	
	<script type="text/javascript">var badges = <?php echo file_get_contents("http://kongregate.com/badges.json");?>;</script>
	<script src='functions.js'></script>
	<script src='compare.js'></script>
</head>

<body>
<noscript>You need to turn JavaScript on...</noscript>

<div style='text-align:center;margin-left:auto;margin-right:auto;width:100%'>

<div class='box_header' id='box_h' style='display:block;'>
	<b>Compare</b>
</div>
<div class='box_body' id='box_b'  style='display:block;height:400px'>
	Who would you like to compare?<br/>
	<input type="text" id="name1" onkeypress='checkEnter(event)'/>
	<input type="text" id="name2" onkeypress='checkEnter(event)'/>
	<button type="button" onclick='run()'>Submit</button>
</div>

</div>
</body>

</html>