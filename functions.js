//Just some functions, nothing much

//This hides a box thing
function hide(what){
	document.getElementById(what+"_h").style.display = "none";
	document.getElementById(what+"_b").style.display = "none";
}

//And this shows one!
function show(what){
	document.getElementById(what+"_h").style.display = "block";
	document.getElementById(what+"_b").style.display = "block";
}

//This sets the main text of a box
function setBody(what, text){
	document.getElementById(what+"_b").innerHTML = text;
}

//And this sets the title of one! Truly amazing stuff
function setTitle(what, text){
	document.getElementById(what+"_h").innerHTML = text;
}

//This saves the data to localStorage, so it can be autoloaded later
function save(){
	localStorage.filters = JSON.stringify(filters);
	localStorage.size = size;
	localStorage.Bset = Bset;
}

//This draws a single badge
function drawBadge(bdg){
	b = "<div class='badge_"+size+"' onclick='loadInfo("+bdg.id+")' title=\""+bdg.name+" Badge - "+bdg.games[0].title+"\">";
	b+= "<div class='badge_image_"+size+"'>";
	b+= "<img src='"+bdg.icon_url+"'/>";
	b+= "</div><div class='badge_border_"+size+"'>";
	if(bdg.earned || userName == "SWBB_NOUSER"){
		b+= "<img src='img/"+Bset+"/B_"+size+"_"+bdg.difficulty+".png' style='border:0px'/>";
	}else{
		b+= "<img src='img/"+Bset+"/BU_"+size+"_"+bdg.difficulty+".png' style='border:0px'/>";
	}
	b+= "</div></div>";
	return b;
}

//This highlights a specific badge container
//Badge containers should have an id of "XYbadge_ID" where "XY" is a string for the type of badge ("q_" for quests, for example), which is also the "type" argument for this thing, and ID should be the badge's ID, obviusly
function high(id, type, diff){
	var bg = String(); //This is the background colour
	
	//Choose a colour
	switch(diff?diff:badges[index].difficulty){
		case "easy":
			bg = "#ccccff";
			break;
		case "medium":
			bg = "#ccffcc";
			break;
		case "hard":
			bg = "#ffcccc";
			break;
		case "impossible":
			bg = "#ffffcc";
			break;
	}
	
	document.getElementById(type+"badge_"+id).style.backgroundColor = bg;
	document.getElementById(type+"badge_"+id).style.borderColor = bg;
}

//This unhighlights a badge container
function unhigh(id, type){
	document.getElementById(type+"badge_"+id).style.backgroundColor = "";
	document.getElementById(type+"badge_"+id).style.borderColor = "";
}

//Sets the element "id" with the text "text"
function set(id, text){
	document.getElementById(id).innerHTML = text;
}

//Find what location in the array a specific badge is
function getIndex(id){
	for(var i = 0; i < 5000; i++){
		if(badges[i].id == id){
			return i;
			break;
		}
	}
}

//This changes the size of the badge
function setSize(sze){
	size = sze;
	save();
	
	//Start the pages from the beginning
	start = 0;
	page = 1;
	
	//Redraw everything
	drawBadges();
	drawQuests();
}

//And this changes the set!
function setSet(st){
	Bset=st;
	save();
	
	//Start the pages from the beginning
	start = 0;
	page = 1;
	
	//Redraw everything
	drawBadges();
	drawQuests();
}

//The random hints
function hint(){
	setBody("hint", hints[Math.floor(Math.random()*hints.length)]);
}

//Checks if the badges are out of date, automatically. I suck at naming functions
function manualUpdate(){
	if(window.XMLHttpRequest){
		var req=new XMLHttpRequest();
	}else if(window.ActiveXObject){
		var req=new ActiveXObject("Microsoft.XMLHTTP");
	}else{
		alert("Your browser does not support XMLHTTP!");
	}
	
	req.open("GET", "get.php", true);
	req.onreadystatechange = function() {
		if(req.readyState == 4) {
			if (req.status == 200) {
				if(JSON.parse(req.responseText).length != badges.length){
					show("date");
				}
			}
		}
	}
	req.send(null);
}

setInterval(manualUpdate, 15*60*1000);