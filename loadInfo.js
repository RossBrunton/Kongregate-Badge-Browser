//This shows info about a single badge
function loadInfo(id){
	show("info");
	
	var b = badges[getIndex(id)]; //The badge we are working withd
	var diff = ""; //Difficulty
	var span = 0; //The number of rows the badge image will take up, changes based on the badge size
	
	//Find difficulty
	switch(b.difficulty){
		case "easy":diff="Easy";break;
		case "medium":diff="Medium";break;
		case "hard":diff="Hard";break;
		case "impossible":diff="Impossible";break;
	}
	
	//Badge size and rowspan
	switch(size){
		case "medium":span=2;break;
		case "big":span=3;break;
		case "small":span=1;break;
	}
	
	document.getElementById("info_badge").rowSpan = span;
	
	//draw the image
	set("info_badge", drawBadge(badges[getIndex(id)]));
	
	//Description
	if(span < 2){
		document.getElementById("info_gamedesk").colSpan = 2;
	}else{
		document.getElementById("info_gamedesk").colSpan = 1;
	}
	set("info_gamedesk", b.description);
	
	//The name
	set("info_name", "#"+b.id+" - "+"<a href='"+b.games[0].url+"?referrer="+REFERRER+"'>"+b.games[0].title+"</a> &gt; <b>"+b.name+"</b> Badge");
	
	//Difficulty
	if(span == 3){
		document.getElementById("info_diffic").colSpan = 1;
	}else{
		document.getElementById("info_diffic").colSpan = 2;
	}
	set("info_diffic", "<b>"+diff+"</b> ("+b.points+"pts)");
	
	//Users count
	set("info_earnby", "<b>Owners:</b> "+b.users_count);
	
	//Date added
	set("info_created", "<b>Added:</b> "+b.created_at.split(" -")[0]);
	
	//Earn date
	if(b.earned){
		set("info_earnon", "<b>Earned:</b> "+b.user.created_at.split(" -")[0]);
	}else{
		set("info_earnon", "<b>Unearned</b>");
	}
}