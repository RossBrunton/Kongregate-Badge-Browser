<?php
#This cool thing updates the rss feed, you should have it on a cron thing or something, maybe?

$rss = "<?xml version='1.0' encoding='utf-8'?><rss version='2.0'><channel>";
$rss .= "<title>Kongregate Badges</title>";
$rss .= "<link>http://badge.savagewolf.org/</link>";
$rss .= "<description>RSS feed of new badges on Kongregate, created by SavageWolf.</description>";
$rss .= "<lastBuildDate>".date("D, d M Y H:i:00", time())." GMT</lastBuildDate>";
$rss .= "<language>en-us</language>";

$badgeList = json_decode(file_get_contents("http://kongregate.com/badges.json"));
$badgeList = array_reverse($badgeList);

#Only display 100 entries
for ($i = 0; $i <= 100; $i++){
	$rss .= "<item>";
	$rss .= "<title>".$badgeList[$i]->name." (".$badgeList[$i]->games[0]->title.")</title>";
	$rss .= "<link>".$badgeList[$i]->games[0]->url."?referrer=SavageWolf</link>";
	$rss .= "<guid isPermaLink='false'>SWBB_".$badgeList[$i]->id."</guid>";
	$rss .= "<pubDate>".$badgeList[$i]->created_at."</pubDate>";
	$rss .= "<description><![CDATA[The game <a href='".$badgeList[$i]->games[0]->url."'>".$badgeList[$i]->games[0]->title."</a> has been given a new ".$badgeList[$i]->difficulty." badge called \"".$badgeList[$i]->name."\".<br/>".$badgeList[$i]->description.".]]></description>";
	$rss .= "</item>";
}

$rss .= "</channel></rss>";

#And set the file to write
$fh = fopen("rss.xml", 'w') or die("Can't open RSS file...");
fwrite($fh, $rss);
fclose($fh);
?>
