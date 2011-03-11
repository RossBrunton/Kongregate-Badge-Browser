<?php
#This gets the badge data for the user
if($HTTP_GET_VARS['user']){
	$text =  file_get_contents("http://kongregate.com/accounts/".$HTTP_GET_VARS['user']."/badges.json");
}else{
	$text =  file_get_contents("http://kongregate.com/badges.json");
}
echo $text;
?>