//This is the main javascript for the compare thing, but you should know that...

//declare vars
var userNameA = String(); //The first username
var userABadges = {}; //And their badges...
var userNameB = String(); //The second username
var userBBadges = {}; //And badges
var earnedA = [0, 0, 0, 0, 0, 0]; //Array containing A's earned badges
var earnedB = [0, 0, 0, 0, 0, 0]; //And B's
var unearned = [0, 0, 0, 0, 0, 0]; //And unearned ones

//Check if the enter key is pressed
function checkEnter(e){
	var characterCode;
	
	if(e && e.which){
		characterCode = e.which;
	}else{
		e = event
		characterCode = e.keyCode;
	}
	
	if(characterCode == 13){
		document.getElementById("name1").blur();
		document.getElementById("name2").blur();
		run();
	}
}

//Called when the user submits the form
function run(){
	userNameA = document.getElementById("name1").value;
	userNameB = document.getElementById("name2").value;
	
	next1();
}

//This loads A's badges
function next1(){
	setBody("box", "Getting "+userNameA+"'s Badges...");
	
	if(window.XMLHttpRequest){
		var req=new XMLHttpRequest();
	}else if(window.ActiveXObject){
		var req=new ActiveXObject("Microsoft.XMLHTTP");
	}else{
		alert("Your browser is too old to use this!");
	}
	
	req.open("GET", "get.php?user="+userNameA, true);
	req.onreadystatechange = function() {
		if(req.readyState == 4) {
			if (req.status == 200) {
				if(req.responseText.indexOf(">") != -1){
					//This means PHP has sent an error
					setBody("box", "Error!");
				}else{
					userABadges = JSON.parse(req.responseText);
					next2();
				}
			}else{
				setBody("box", "Error!");
			}
		}
	}
	
	req.send(null);
}

//This gets B's badges
function next2(){
	setBody("box", "Getting "+userNameB+"'s Badges...");
	
	if(window.XMLHttpRequest){
		var req=new XMLHttpRequest();
	}else if(window.ActiveXObject){
		var req=new ActiveXObject("Microsoft.XMLHTTP");
	}else{
		alert("Your browser is too old to use this!");
	}
	
	req.open("GET", "get.php?user="+userNameB, true);
	req.onreadystatechange = function() {
		if(req.readyState == 4) {
			if (req.status == 200) {
				if(req.responseText.indexOf(">") != -1){
					//This means PHP has sent an error
					setBody("box", "Error!");
				}else{
					userBBadges = JSON.parse(req.responseText);
					next3();
				}
			}else{
				setBody("box", "Error!");
			}
		}
	}
	
	req.send(null);
}

//This prepares the data
function next3(){
	setBody("box", "Preparing Data...");
	
	//Count up all the badges
	for(k = 0; k < badges.length; k++){
		switch(badges[k].difficulty){
			case "easy":unearned[0]++;break;
			case "medium":unearned[1]++;break;
			case "hard":unearned[2]++;break;
			case "impossible":unearned[3]++;break;
		}
		unearned[4] ++;
		unearned[5] += badges[k].points;
	}
	
	//Now A's ones
	for(i = 0; i < userABadges.length; i++){
		while(j = 0; j < badges.length; j++){
			if(userABadges[i].badge_id == badges[j].id){
				switch(badges[j].difficulty){
					case "easy":earnedA[0]++;break;
					case "medium":earnedA[1]++;break;
					case "hard":earnedA[2]++;break;
					case "impossible":earnedA[3]++;break;
				}
				earnedA[4] ++;
				earnedA[5] += badges[j].points;
			}
		}
	}
	
	//And B's ones
	for(i = 0; i < userBBadges.length; i++){
		for(j = 0; j < badges.length; j++){
			if(userBBadges[i].badge_id == badges[j].id){
				switch(badges[j].difficulty){
					case "easy":earnedB[0]++;break;
					case "medium":earnedB[1]++;break;
					case "hard":earnedB[2]++;break;
					case "impossible":earnedB[3]++;break;
				}
				earnedB[4] ++;
				earnedB[5] += badges[j].points;
			}
		}
	}
	
	//Now display everything
	var bar = String();
	var stats = String();
	stats="<table width='100%'>";
	
	for(i = 0; i <= 5; i++){
		//Loop through all the main stat types, and display them
		
		stats += "<tr><td>";
		switch(i){
			case 0:
				stats += "<b>Easy</b>";
				break;
			case 1:
				stats += "<b>Medium</b>";
				break;
			case 2:
				stats += "<b>Hard</b>";
				break;
			case 3:
				stats += "<b>Impossible</b>";
				break;
			case 4:
				stats += "<b>All</b>";
				break;
			case 5:
				stats += "<b>Badge Points</b>";
				break;
		}
		
		//Display A's stats
		stats += "</td><td>";
			stats += Math.round(((earnedA[i]/unearned[i])*100))+"%";
		stats += "</td><td align='center'>";
			stats += "<div class='bar_border' style='background-color:#003300' align='left'><img src='img/barG.gif' width='"+Math.round(((earnedA[i]/unearned[i])*100)*5)+"px' height='10px' style='border:0px;position:absolute'/></div>";
		stats += "</td><td>";
			stats += earnedA[i]+"/"+unearned[i];
		stats += "</td><td align='right'>";
			stats += (unearned[i] - earnedA[i])+" Left";
		stats += "</td></tr></tr>";
		
		//And also B's
		stats += "<tr><td>&nbsp;";
		stats += "</td><td>";
			stats += Math.round(((earnedB[i]/unearned[i])*100))+"%";
		stats += "</td><td align='center'>"
			stats += "<div class='bar_border' style='background-color:#000033' align='left'><img src='img/barB.gif' width='"+Math.round(((earnedB[i]/unearned[i])*100)*5)+"px' height='10px' style='border:0px;position:absolute'/></div>";
		stats += "</td><td>";
			stats += earnedB[i]+"/"+unearned[i];
		stats += "</td><td align='right'>";
			stats += (unearned[i] - earnedB[i])+" Left";
		
		//And a line
		if(i != 5){
			stats += "</td><tr><td><hr/></td></tr>";
		}else{
			stats += "</td></tr>";
		}
	}
	
	stats += "</table>";
	
	//And now set the text
	setTitle("box", "<b><span style='color:#55ff55'>"+userNameA+"</span> / <span style='color:#5555ff'>"+userNameB+"</span>")
	setBody("box", "<span style='text-align:left'>"+stats+"</span>");
}
