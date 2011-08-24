//This just formats the main stats area
function getStats(){
	var stats = "<table width='100%' style='text-align:left'>"; //The actuall string we are using
	var copytext = "(Copy the data below and put it on your profile or something)\n\n*BADGE DATA*\n"; //The text to be alerted when the user clicks a link
	
	for(var i = 0; i < unearned.length; i++){
		var bar = String();
		var colour = String();
		var tweetText = String(); //The text to tweet
		
		//Determine what bar and colout we use
		if(Math.round(((earned[i]/unearned[i])*100)) == 100){
			bar = "barXX.gif";
			colour = "333333";
		}else if(Math.round(((earned[i]/unearned[i])*100)) >= 80){
			bar = "barX.gif";
			colour = "333300";
		}else{
			bar = "bar.gif";
			colour = "330000";
		}
		
		tweetText = "I%20have%20"+earned[i] + "/" + unearned[i] + "%20";
		stats += "<tr><td>";
		
		//Now see what data we are actually using
		switch(i){
			case 0:
				stats += "<b>Easy</b>";
				copytext += "Easy: ";
				tweetText += "easy%20badges%20";
				break;
			case 1:
				stats += "<b>Medium</b>";
				copytext += "Medium: ";
				tweetText += "medium%20badges%20";
				break;
			case 2:
				stats += "<b>Hard</b>";
				copytext += "Hard: ";
				tweetText += "hard%20badges%20";
				break;
			case 3:
				stats += "<b>Impossible</b>";
				copytext += "Impossible: ";
				tweetText += "impossible%20badges%20";
				break;
			case 4:
				stats += "<b>All</b>";
				copytext += "All: ";
				tweetText += "badges%20";
				break;
			case 5:
				stats += "<b>Badge Points</b>";
				copytext += "Points: ";
				tweetText += "badge%20points%20";
				break;
		}
		
		stats += "</td>";
		copytext += (unearned[i] - earned[i])+" left - "+Math.round(((earned[i]/unearned[i])*100))+"% - "+earned[i]+"/"+unearned[i]+"\n";
		tweetText += "("+Math.round(((earned[i]/unearned[i])*100))+"%25)%20on%20Kongregate! ";
		
		//Now lets fill it the other info
			stats += "<td>"+Math.round(((earned[i]/unearned[i])*100))+"%";
		stats += "</td><td style='text-align:center'>"
			stats += "<div class='bar_border' style='background-color:#"+colour+"' align='left'><img src='img/"+bar+"' width='"+Math.round(((earned[i]/unearned[i])*100)*5)+"px' height='10px' style='border:0px;position:absolute'/></div>";
		stats += "</td><td>"
			stats += earned[i]+"/"+unearned[i];
		stats += "</td><td align='right'>"
			stats += (unearned[i] - earned[i])+" Left";
		
		//Display a tweet button if using twitter
		if(TWITTER){
			stats += "</td><td align='right'>";
				stats += '<iframe allowtransparency="true" frameborder="0" scrolling="no" tabindex="0" class="twitter-share-button twitter-count-none" src="http://platform0.twitter.com/widgets/tweet_button.html?count=none&amp;lang=en&amp;related=Kongregate&amp;text='+tweetText+'&amp;url='+TWITTERURL+'" style="width:55px; height:20px;" title="Tweet Button"></iframe>';
			stats += "</td>";
		}
		stats += "<td align='right' id='statRank_"+i+"'>";
		
		stats += "</td></tr>";
	}
	
	//Average
	copytext += "Average: "+(Math.round((earned[5]/earned[4])*10)/10)+"pts/badge\n";
	
	//The button things underneath the stats
	stats += "</table>Average: "+(Math.round((earned[5]/earned[4])*10)/10)+"pts/badge - <a onclick='alert(copytext)'>Copy</a> - <a href='#' onclick=\"window.open('http://badge.wolfthatissavage.com/compare.php','compare','width=1050,height=475,toolbar=no, location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no, resizable=no')\">Compare</a>";
	if(RANKING){
		stats +=  " - <a href='#' onclick='if(confirm(\"Do you want to send your badge data to be ranked?\")){doRanking();}'>Submit</a>";
	}
	
	//And the username and logout
	stats += "<br/>" + userName + " - <a href='/' onclick='localStorage.username = \"\"'>Logout</a>";
	
	//FINALLY we can set the text
	setBody("stats", stats);
}
