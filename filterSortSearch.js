//Filter, sort and search, all the cool things in life

//Sets a filter
function setFilter(filter, value){
	var next = true; //If set to false, the filter will be added
	
	//Checks to see if a filter exists, and if it does, changes it or removes it
	for(var i = 0; i < filters.length; i++){
		if(filters[i].name == filter && filters[i].value == value){
			filters.splice(i, 1);
			next = false;
			break;
		}else if(filters[i].name == filter){
			filters[i].value = value;
			next = false;
			break;
		}
	}
	
	//If no filter is in effect, remove it
	if(next){
		filters.push({"name":filter,"value":value});
	}
	
	//Reinitiate everything
	start = 0;
	page = 1;
	drawBadges();
	updateTexts();
	
	save();
}

//Sorting functions, they sort the badges array by stuff
function sortByEarn(a, b){
	if(a.users_count > b.users_count){
		return 1;
	}else{
		return -1;
	}
}

function sortById(a, b){
	if(a.id > b.id){
		return 1;
	}else{
		return -1;
	}
}

function sortByDifficulty(a, b){
	if(a.points > b.points){
		return 1;
	}else if(a.points < b.points){
		return -1;
	}else{
		return 0;
	}
}

function sortByName(a, b){
	if(a.name.indexOf("\"") != -1){
		a = a.name.split('"')[1];
	}else{
		a = a.name;
	}
	
	if(b.name.indexOf("\"") != -1){
		b = b.name.split('"')[1];
	}else{
		b = b.name
	}
	
	if(a > b){
		return 1;
	}else{
		return -1;
	}
}

//This uses the functions above to sort the badges, badges are loaded depending on position in the array, remember
function sortBadges(funct, acen){
	badges.sort(funct);
	if(acen){
		badges.reverse();
	}
	
	start = 0;
	page = 1;
	drawBadges();
}

//Updates the search area
function updateSearch(){
	if(search != document.getElementById("src").value || useRegExp != document.getElementById("regexp").value){
		search = document.getElementById("src").value;
		document.getElementById("regexp").disabled = false;
		continueIt = true;
		try {
			varOfHolding = RegExp(document.getElementById("src").value, "i");
		}catch(e){
			continueIt = false;
			document.getElementById("regexp").checked = false;
			document.getElementById("regexp").disabled = true;
			useRegExp = false;
		}
		if(continueIt){
			searchR = RegExp(document.getElementById("src").value, "i");
		}
		useRegExp = document.getElementById("regexp").value;
		
		start = 0;
		page = 1;
		drawBadges();
	}
}

function updateTexts(){
	set("filt_earn", "");
	set("filt_difficulty", "");
	set("filt_quest", "");
	
	for(var i = 0; i < filters.length; i++){
		var toSet = "";
		
		if(filters[i].name == "earn"){
			if(filters[i].value){
				toSet = "Earned";
			}else{
				toSet = "Unearned";
			}
		}else if(filters[i].name == "difficulty"){
			switch(filters[i].value){
				case "easy":toSet="Easy";break;
				case "medium":toSet="Medium";break;
				case "hard":toSet="Hard";break;
				case "impossible":toSet="Impossible";break;
			}
		}else if(filters[i].name == "quest"){
			if(filters[i].value){
				toSet = "in Quests";
			}else{
				toSet = "not in Quests";
			}
		}
		
		set("filt_"+filters[i].name, toSet);
	}
}