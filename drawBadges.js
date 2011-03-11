//This draws the main badge display area box thing
function drawBadges(){
	var bn = start; //The id in the array to use
	var drawn = 0; //The number of badges that have been drawn
	var sizeLoop = 0; //The number of rows=sizeLoop, collumns=sizeLoop*2
	var badgeText = "<table>"; //The text we are eventually going to set the box as
	
	//There are a different number of rows and cols for each icon size
	switch(size){
		case "medium":sizeLoop=10;break;
		case "big":sizeLoop=5;break;
		case "small":sizeLoop=17.5;break;
	}
	
	for(var i = 0; i < sizeLoop; i++){
		//Loop through every row
		badgeText += "<tr class='badge_row'>";
		
		for(var j = 0; j < sizeLoop*2; null){
			//And every collumn
			var pass = true;
			
			//Check if it matches any filters, if it fails any test pass is set to false and the badge isn't drawn
			for(var l = 0; l < filters.length; l++){
				switch(filters[l].name){
					case "difficulty":
						if(badges[bn].difficulty != filters[l].value){
							pass = false;
						}
						break;
					case "earn":
						if(badges[bn].earned != filters[l].value){
							pass = false;
						}
						break;
					case "quest":
						if(badges[bn].quested != filters[l].value){
							pass = false;
						}
						break;
				}
			}
			
			//Check if there is a search active
			if(useRegExp){
				if(badges[bn].name.search(searchR) == -1 && badges[bn].games[0].title.search(searchR) == -1 && badges[bn].description.search(searchR) == -1){
					pass = false;
				}
			}else{
				if(badges[bn].name.toLowerCase().indexOf(search.toLowerCase()) == -1 && badges[bn].games[0].title.toLowerCase().indexOf(search.toLowerCase()) == -1 && badges[bn].description.toLowerCase().indexOf(search.toLowerCase()) == -1){
					pass = false;
				}
			}
			
			//Draw the badge if we have not been told it is invalid
			if(pass){
				badgeText += "<td id='badge_"+badges[bn].id+"' onmouseover='high("+badges[bn].id+", \"\", \""+badges[bn].difficulty+"\")' onmouseout='unhigh("+badges[bn].id+", \"\")' class='badge_box'>";
				badgeText += drawBadge(badges[bn], true);
				badgeText += "</td>"
				j ++;
				drawn ++;
			}
			
			bn ++;
			//If there is no badge to load next, panic and break out and escape and such
			if(!badges[bn]){
				break;
			}
		}
		
		badgeText += "</tr>";
		if(!badges[bn]){
			break;
		}
	}
	
	badgeText += "</table>";
	
	//If we have not displayed any badges, say so
	if(drawn == 0){
		badgeText += "No badges were found...<br/>";
	}
	
	//If we didn't start from badge 0, then show a back page
	if(start){
		badgeText += "<a onclick='start = "+pageBadgeS[page-1]+";page --;drawBadges()'> &lt; Back</a>";
	}else{
		badgeText += "&lt; Back"
	}
	
	badgeText += " - Page "+page+" - ";
	
	//And a next page
	if(badges[bn]){
		badgeText += "<a onclick='pageBadgeS[page] = start;start = "+bn+";page ++;drawBadges()'>Next &gt;</a>";
	}else{
		badgeText += "Next &gt;"
	}
	
	//And actually set the text
	setBody("badges", badgeText);
}