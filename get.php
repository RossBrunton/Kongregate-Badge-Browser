<?php
#This gets the badge data for the user
if($_GET['user']){
	$text =  file_get_contents("http://kongregate.com/accounts/".$_GET['user']."/badges.json");
}else{
	$text =  file_get_contents("http://kongregate.com/badges.json");
}
echo $text;
?>