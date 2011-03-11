<?php
#This submits the user's score

#Load configuration
include("config.php");

#Connect to DB
$con = mysql_connect("localhost:Database", $USERNAME, $PASSWORD);
if (!$con){
	die('Could not connect: ' . mysql_error());
}

mysql_select_db($DATABASE, $con);

#This secures the username
function modText($text){
	$text = preg_replace("/</i", "&lt;", $text);
	$text = preg_replace("/>/i", "&gt;", $text);
	
	$text = preg_replace('/\"/i', "&quot;", $text);
	$text = preg_replace("/&/i", "&amp;", $text);
	$text = preg_replace("/\'/i", "&#39;", $text);
	$text = preg_replace("/\\\/i", "&#92;", $text);

	return $text;
}

#Secure all the data
$_POST["easy"] = (int)$_POST["easy"];
$_POST["medium"] =(int)$_POST["medium"];
$_POST["hard"] = (int)$_POST["hard"];
$_POST["impossible"] = (int)$_POST["impossible"];
$_POST["all"] = (int)$_POST["all"];
$_POST["points"] = (int)$_POST["points"];

$_POST["username"] = modText($_POST["username"]);

#Has this user already submited stats, if so, update them else insert them
if(mysql_numrows(mysql_query("SELECT * FROM badgebrowse_ranking WHERE username = '".$_POST["username"]."'")) != 0){
	mysql_query("UPDATE badgebrowse_ranking SET 
	easy = '".$_POST["easy"]."',
	medium = '".$_POST["medium"]."',
	hard = '".$_POST["hard"]."',
	impossible = '".$_POST["impossible"]."',
	allb = '".$_POST["all"]."',
	points = '".$_POST["points"]."'
	
	WHERE username = '".$_POST["username"]."'");
}else{
	mysql_query("INSERT INTO badgebrowse_ranking (easy, medium, hard, impossible, allb, points, username)
	VALUES ('".$_POST['easy']."',
	'".$_POST['medium']."',
	'".$_POST['hard']."',
	'".$_POST['impossible']."',
	'".$_POST['all']."',
	'".$_POST['points']."',
	'".$_POST['username']."')");
}

#Get the results
$holdString = "";

$holdString .= mysql_numrows(mysql_query("SELECT * FROM badgebrowse_ranking WHERE easy >= '".$_POST['easy']."'")).".";
$holdString .= mysql_numrows(mysql_query("SELECT * FROM badgebrowse_ranking WHERE medium >= '".$_POST['medium']."'")).".";
$holdString .= mysql_numrows(mysql_query("SELECT * FROM badgebrowse_ranking WHERE hard >= '".$_POST['hard']."'")).".";
$holdString .= mysql_numrows(mysql_query("SELECT * FROM badgebrowse_ranking WHERE impossible >= '".$_POST['impossible']."'")).".";
$holdString .= mysql_numrows(mysql_query("SELECT * FROM badgebrowse_ranking WHERE allb >= '".$_POST['all']."'")).".";
$holdString .= mysql_numrows(mysql_query("SELECT * FROM badgebrowse_ranking WHERE points >= '".$_POST['points']."'"));

echo $holdString;
?>