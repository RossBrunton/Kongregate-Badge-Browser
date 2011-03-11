//Checks if the enter key has been pressed, if so, runs the thing
function checkEnter(e){
	var characterCode;
	
	if(e && e.which){
		characterCode = e.which;
	}else{
		e = event
		characterCode = e.keyCode;
	}
	
	if(characterCode == 13){
		document.getElementById("name").blur();
		run();
	}
}

//Runs the loader to get badges and stuff
function run(){
	hide("login");
	hide("hello");
	show("load");
	if(!userName){
		userName = document.getElementById("name").value;
	}
	
	localStorage.username = userName != "SWBB_NOUSER"?userName:"";
	
	next1();
}

//Loads the user's badges
function next1(){
	document.getElementById("loadingWhat").innerHTML = "Getting Your Badges...";
	
	//Call if something has gone wrong...
	function err() {
		show("error");
		show("login");
		hide("load");
		userName = "";
		localStorage.username = "";
	}
	
	if(window.XMLHttpRequest){
		var req=new XMLHttpRequest();
	}else if(window.ActiveXObject){
		var req=new ActiveXObject("Microsoft.XMLHTTP");
	}else{
		alert("Your browser does not support XMLHTTP!");
	}
	req.open("GET", "get.php?user="+userName, true);
	req.onreadystatechange = function() {
		if(req.readyState === 4) {
			if (req.status === 200) {
				if(req.responseText.indexOf(">") != -1){
					err();
				}else{
					//Everything is fine
					userBadges = JSON.parse(req.responseText);
					next2();
				}
			}else{
				err();
			}
		}
	}
	req.send(null);
}

//This prepares the data
function next2(){
	document.getElementById("loadingWhat").innerHTML = "Preparing Data...";
	
	//Count up all the badges, and format them
	for(var k = 0; k < badges.length; k++){
		badges[k].earned = false;
		badges[k].quested = false;
		switch(badges[k].difficulty){
			case "easy":unearned[0]++;break;
			case "medium":unearned[1]++;break;
			case "hard":unearned[2]++;break;
			case "impossible":unearned[3]++;break;
		}
		unearned[4] ++;
		unearned[5] += badges[k].points;
	}
	
	//And the user's badges as well
	for(var i = 0; i < userBadges.length; i++){
		for(var j = 0; j < badges.length; j++){
			if(userBadges[i].badge_id == badges[j].id){
				badges[j].earned = true;
				badges[j].user = {};
				badges[j].user = userBadges[i];
				switch(badges[j].difficulty){
					case "easy":earned[0]++;break;
					case "medium":earned[1]++;break;
					case "hard":earned[2]++;break;
					case "impossible":earned[3]++;break;
				}
				earned[4] ++;
				earned[5] += badges[j].points;
			}
		}
	}
	
	//And the quests...
	for(var i = 0; i < quests.length; i++){
		for(var j = 0; j < quests[i].badges.length; j++){
			for(k = 0; k < badges.length; k++){
				if(quests[i].badges[j] == badges[k].id){
					badges[k].quested = true;
					quests[i].badges[j] = badges[k];
				}
			}
		}
	}
	
	badges.reverse();
	
	//Displays/hides the UI
	hide("load");
	hide("update");
	hide("error");
	show("badges");
	show("filter");
	show("sort");
	show("img");
	show("hint");
	if(SCRIPT_ACCESS){show("runJS")}
	if(userName != "SWBB_NOUSER"){show("stats")}
	//setBody("countd", "Only "+(1000-badges.length)+" badges until we have 1000!");
	//show("countd");
	
	//And run things
	drawBadges();
	getStats();
	drawQuests();
	hint();
	setInterval(hint, 10000);
	updateSearch();
	updateTexts();
}