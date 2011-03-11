//This draws all the badge quests
function drawQuests(){
	var text = ""; //The text to set the box, eventually
	
	//Loop through every quest (Which were loaded as JSOn earlier and sstored in quests
	for(var x = 0; x < quests.length; x++){
		var bn = 0; //Number of badges displayed
		
		//Fancy display stuff
		text += "<div class='box_header' id='quest_"+x+"_h' style='display:block'><b>"+quests[x].name+" Quest</b></div>";
		
		text += "<div class='box_body' id='quest_"+x+"_b' style='display:block'><table width='100%'>";
		text += "<tr><td><img src='"+quests[x].icon+"'></td><td style='padding-left:5px'>"+quests[x].description+"<br/><i>Ends "+quests[x].end+"</i></td></tr><table><table>"
		
		for(var i = 0; i < 10; i++){
			//Now lets go through the badges!
			text += "<tr class='badge_row'>";
			
			for(var j = 0; j < 20; j ++){
				text += "<td id='q_badge_"+quests[x].badges[bn].id+"' onmouseover='high("+quests[x].badges[bn].id+", \"q_\", \""+quests[x].badges[bn].difficulty+"\")' onmouseout='unhigh("+quests[x].badges[bn].id+", \"q_\")' class='badge_box'>";
				text += drawBadge(quests[x].badges[bn]);
				text += "</td>";
				bn ++;
				
				//If there are no more badges, then break
				if(!quests[x].badges[bn]){
					break;
				};
			}
			
			text += "</tr>";
			
			if(!quests[x].badges[bn]){
				break;
			}
		}
		
		text += "</table></div>";
	}
	
	//Finally set the text
	set("quests", text);
}