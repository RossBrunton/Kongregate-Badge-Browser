<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<title>Badge Browser</title>
	
	<link href="styles.css" rel="stylesheet" type="text/css" />
	<link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
	
	<meta name="google-site-verification" id="verify" />
	<meta name='description' content="A tool for browsing and sorting Kongregate's badges."/>
	<meta name='keywords' content='Games,Flash,Kongregate'/>
	<meta name='author' content='SavageWolf'/>
	<meta charset="utf-8"/>
	
	<script type="text/javascript">var badges = <?php echo file_get_contents("http://kongregate.com/badges.json");?>;</script>
	<script type="text/javascript">var quests = <?php echo file_get_contents("quests.json");?>;</script>
	<script type="text/javascript">var hints = <?php echo file_get_contents("messages.json");?>;</script>
	<script type="text/javascript" src='config.js'></script>
	<script type="text/javascript" src='loader.js'></script>
	<script type="text/javascript" src='drawBadges.js'></script>
	<script type="text/javascript" src='drawQuests.js'></script>
	<script type="text/javascript" src='loadInfo.js'></script>
	<script type="text/javascript" src='functions.js'></script>
	<script type="text/javascript" src='getStats.js'></script>
	<script type="text/javascript" src='filterSortSearch.js'></script>
	<script type="text/javascript" src='ranking.js'></script>
	<script type="text/javascript" src='vars.js'></script>
	
	<script type="text/javascript">window.google_analytics_uacct = GA_ACCOUNT;</script>
	<script type="text/javascript">
	//Google analytics
	if(GA_ACCOUNT){
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount',GA_ACCOUNT]);
		_gaq.push(['_trackPageview']);
		
		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	}
	
	//Google verification
	document.getElementById("verify").content = G_SITE_VERIFY;
	</script>
</head>

<body>

<!-- SavageWolf's badge browser -->

<noscript>You need to turn JavaScript on...</noscript>
<div style='text-align:center;margin-left:auto;margin-right:auto;width:100%'>

<div id='imageContainer' style='display:none'>
	
</div>

<!-- Advertisement -->
<div class='box_header' id='ada_h' style='display:block'>
	<b>Advertisement</b>
</div>
<div class='box_body' id='ada_b' style='display:block'>
	<script type="text/javascript"><!--
		google_ad_client = G_AD_CLIENT;
		/* Badge Browser */
		google_ad_slot = G_AD_SLOT;
		google_ad_width = 728;
		google_ad_height = 90;
		
		if(!G_AD_CLIENT){
			hide("ada");
		}
	</script>
	<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>
</div>

<!-- Random hints -->
<div class='box_header' id='hint_h'>
	<b>Random Hint</b>
</div>
<div class='box_body' id='hint_b'>
	
</div>


<!--<div class='box_header' id='countd_h'>
	<b>Badge Countdown</b>
</div>
<div class='box_body' id='countd_b' style='font-size:150%;'>
	
</div>-->

<!-- Error -->
<div class='box_header' id='error_h'>
	<b>Error</b>
</div>
<div class='box_body' id='error_b'>
	An error has occured...
</div>

<!-- The generic greeting -->
<div class='box_header' id='hello_h' style='display:block'>
	<b>Hello</b>
</div>
<div class='box_body' id='hello_b'  style='display:block'>
	
</div>
<script>setBody("hello", HELLO);</script>

<!-- Login form -->
<div class='box_header' id='login_h' style='display:block'>
	<b>Login</b>
</div>
<div class='box_body' id='login_b'  style='display:block'>
	What is your Kongregate name?<br/>
	<input type="text" id="name" onkeypress='checkEnter()'/>
	<button type="button" onclick='run()'>Submit</button><br/>
	(<a onclick='document.getElementById("name").value = "SWBB_NOUSER";run();document.getElementById("earnUnearn").innerHTML = ""'>Guest</a> - <a onclick="window.open('/compare.php','compare','width=1050,height=475,toolbar=no, location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no, resizable=no')">Compare</a>)
</div>

<!--April fools gag -->
<script type='text/javascript'>
getHttpVars();
if(!skipGag && (new Date()).getMonth() == 3 && (new Date()).getDate() == 1){
	setBody("login", "Kongregate Badge Browser, only $5 a month. Buy now!<br/><a href='explain.html'><img src='buyNow.gif' border='0' alt='Buy Now!'/></a>");
}
</script>

<!-- Loading... -->
<div class='box_header' id='load_h'>
	<b>Loading</b>
</div>
<div class='box_body' id='load_b'>
	<span id='loadingWhat'></span>
	<br/><br/><object type="application/x-shockwave-flash" width="50" height="50" id="load" data="load.swf"><param name="movie" value="load.swf" /><param name="quality" value="high" /></object><br/>&nbsp;
</div>

<!-- Latest updates -->
<div class='box_header' id='update_h' style='display:block'>
	<b>Updates</b>
</div>
<div class='box_body' id='update_b'  style='display:block;text-align:left;'>
	<table style='width:100%'>
		<tr><td style='width:20%'>17:09 11/03/11</td><td style='width:80%'>Open source! See <a href='https://github.com/SavageWolf/Kongregate-Badge-Browser'>here</a>!</td></tr>
		<tr><td style='width:20%'>19:06 19/02/11</td><td style='width:80%'>Guest mode and Twitter! Hooray!</td></tr>
		<tr><td style='width:20%'>11:09 14/02/11</td><td style='width:80%'>There is now an RSS feed! See <a href='http://badge.wolfthatissavage.com/rss.xml'>here</a>.</td></tr>
		<tr><td style='width:20%'>12:20 23/01/11</td><td style='width:80%'>Usernames are saved, and the app checks for new badges, hopefully.</td></tr>
		<tr><td style='width:20%'>19:30 22/01/11</td><td style='width:80%'>Filters and settings are saved. It's been a year since this was released!</td></tr>
		<tr><td style='width:20%'>11:39 21/05/10</td><td style='width:80%'>Ranking.</td></tr>
		<tr><td style='width:20%'>17:32 26/03/10</td><td style='width:80%'>RegExp search and JavaScript access.</td></tr>
		<tr><td style='width:20%'>07:48 04/02/10</td><td style='width:80%'>Added a search and load sign.</td></tr>
		<tr><td style='width:20%'>12:08 31/01/10</td><td style='width:80%'>There are now more "badges of the day".</td></tr>
		<tr><td style='width:20%'>05:52 30/01/10</td><td style='width:80%'>Added "compare" feature.</td></tr>
		<tr><td style='width:20%'>04:15 30/01/10</td><td style='width:80%'>Added a new badge set.</td></tr>
		<tr><td style='width:20%'>03:15 30/01/10</td><td style='width:80%'>Added average points per badge.</td></tr>
		<tr><td style='width:20%'>03:03 22/01/10</td><td style='width:80%'>First version!</td></tr>
	</table>
</div>

<!-- Main stats area -->
<div class='box_header' id='stats_h'>
	<b>Badge Stats</b>
</div>
<div class='box_body' id='stats_b'>
	
</div>

<!-- Set selection -->
<div class='box_header' id='img_h'>
	<b>Badge Sets</b>
</div>
<div class='box_body' id='img_b'>
	(<a onclick='setSize("small")'>Small</a> - <a onclick='setSize("medium")'>Medium</a> - <a onclick='setSize("big")'>Large</a>)<br/>
	<a onclick='setSet("default")' title='Default, by SavageWolf'><img src='img/default/B_medium_medium.png' style='border:0px'/></a> 
	<a onclick='setSet("circular")' title='Circular, by SavageWolf'><img src='img/circular/B_medium_medium.png' style='border:0px'/></a>
</div>

<!-- Filter selection -->
<div class='box_header' id='filter_h'>
	<b>Filters</b>
</div>
<div class='box_body' id='filter_b'>
	<a onclick='setFilter("difficulty", "easy")'>Easy</a> - <a onclick='setFilter("difficulty", "medium")'>Medium</a> - <a onclick='setFilter("difficulty", "hard")'>Hard</a> - <a onclick='setFilter("difficulty", "impossible")'>Impossible</a>
	<br/>
	<span id='earnUnearn'><a onclick='setFilter("earn", true)'>Earned</a> - <a onclick='setFilter("earn", false)'>Unearned</a>
	<br/></span>
	<a onclick='setFilter("quest", true)'>In Quests</a> - <a onclick='setFilter("quest", false)'>Not in Quests</a>
	<br/>
	Search: <input type="text" id="src" onkeydown="setTimeout(updateSearch, 5)"/><input type="checkbox" id="regexp" onclick="setTimeout(updateSearch, 5)" title='Regular Expression Search'/>RegExp
	<br/>
	<span id='filt_earn'></span> <span id='filt_difficulty'></span> Badges <span id='filt_quest'></span>
</div>

<!-- Sorting -->
<div class='box_header' id='sort_h'>
	<b>Sort</b>
</div>
<div class='box_body' id='sort_b'>
	Time Added (<a onclick='sortBadges(sortById, false)' title="Ascending">A</a> <a onclick='sortBadges(sortById, true)' title="Decending">D</a>)
	 - Earn Count (<a onclick='sortBadges(sortByEarn, false)' title="Ascending">A</a> <a onclick='sortBadges(sortByEarn, true)' title="Decending">D</a>)
	 - Points (<a onclick='sortBadges(sortByDifficulty, false)' title="Ascending">A</a> <a onclick='sortBadges(sortByDifficulty, true)' title="Decending">D</a>) 
	 - Name (<a onclick='sortBadges(sortByName, false)' title="Ascending">A</a> <a onclick='sortBadges(sortByName, true)' title="Decending">D</a>)
</div>

<!-- Oh noes! -->
<div class='box_header' id='date_h'>
	<b>Badges are out of date</b>
</div>
<div class='box_body' id='date_b'>
	The list of badges is out of date, please refresh to see the latest ones.
</div>

<!-- The main badges area -->
<div class='box_header' id='badges_h'>
	<b>Badges</b>
</div>
<div class='box_body' id='badges_b'>
	
</div>

<!-- Information on one badge -->
<div class='box_header' id='info_h'>
	<b>Badge Information</b>
</div>
<div class='box_body' id='info_b' style='text-align:left;'>
	<table style='width:100%'>
		<tr>
			<td rowspan='2' style='width:44px;float:bottom' id='info_badge'>
				
			</td>
			<td id='info_name'>
				
			</td>
			<td style='width:25%' id='info_created'>
				
			</td>
		</tr>
		
		<tr>
			<td id='info_gamedesk'>
				
			</td>
			<td id='info_earnby'>
				
			</td>
		</tr>
		
		<tr>
			<td colspan='2' id='info_diffic'>
				
			</td>
			<td id='info_earnon'>
				
			</td>
		</tr>
	</table>
</div>

<!-- Run a javascript thingy -->
<div class='box_header' id='runJS_h'>
	<b>Run JavaScript</b>
</div>
<div class='box_body' id='runJS_b'>
	The badges are stored in <code>badges[]</code>, user data is stored in <code>badges[i].user</code> and quests are in <code>quests[]</code>. Have fun!<br/>
	<textarea id="JSrun" rows='5' cols='100'></textarea><br/>
	<button type="button" onclick="try{eval(document.getElementById('JSrun').value);}catch(e){alert('That didn\'t work...');}">Run</button><br/>
</div>

<!-- Container for quests -->
<div id='quests'>
	
</div>

<!-- Advertisement -->
<div class='box_header' id='adb_h' style='display:block'>
	<b>Another Advertisement</b>
</div>
<div class='box_body' id='adb_b' style='display:block'>
	<script type="text/javascript"><!--
		google_ad_client = G_AD_CLIENT;
		/* Badge Browser */
		google_ad_slot = G_AD_SLOT;
		google_ad_width = 728;
		google_ad_height = 90;
		
		if(!G_AD_CLIENT){
			hide("adb");
		}
	</script>
	<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>
</div>

</div>

<script>
if(userName !== "" && !(!skipGag && (new Date()).getMonth() == 3 && (new Date()).getDate() == 1)){
	run();
}
</script>
</body>

</html>
