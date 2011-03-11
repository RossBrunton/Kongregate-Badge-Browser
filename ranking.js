//Manages the ranking

//Lets do thiss thing!
function doRanking(){
	var http = new XMLHttpRequest();
	
	//Params
	var params = "username="+userName;
	params += "&easy="+earned[0];
	params += "&medium="+earned[1];
	params += "&hard="+earned[2];
	params += "&impossible="+earned[3];
	params += "&all="+earned[4];
	params += "&points="+earned[5];
	
	http.open("POST", "submit.php", true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	http.setRequestHeader("Connection", "close");

	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			text = http.responseText.split(".");
			//Lets display the stats
			for(var i in text){
				document.getElementById("statRank_"+i).innerHTML = text[i]+getTh(text[i]);
			}
		}
	}
	
	if(RANKING){
		http.send(params);
	}
}

//Gets weather to use "nd" or "st", as in 2nd or 1st
function getTh(number){
	switch(number.charAt(number.length-1)){
		case "1":return "st";
		case "2":return "nd";
		case "3":return "rd";
		default:return "th";
	}
}