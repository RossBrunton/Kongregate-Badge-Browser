//This contains all the global variables
var userName = localStorage && localStorage.username?localStorage.username:""; //This contains the username, SWBB_NOUSER if the user is a guest
var userBadges = {}; //The badges the user has earned
var filters = localStorage && localStorage.filters?JSON.parse(localStorage.filters):[]; //Any filters in effect, it's an array of objects with "name" and "value"
var start = 0; //The badge number we are starting from
var page = 1; //The page we are on
var pageBadgeS = []; //Contains a list of badge numbers depending on the page, pageBadgeS[page-1] will contain the start no of the last page
var earned = [0, 0, 0, 0, 0, 0]; //The badges the user has earned, it is [easy, medium, hard, imposs, all, points]
var unearned = [0, 0, 0, 0, 0, 0]; //The total number of badges, whether earned or not
var size = localStorage && localStorage.size?localStorage.size:"medium"; //Badge size, "small", "medium" or "large"
var Bset = localStorage && localStorage.Bset?localStorage.Bset:"default"; //Badge set, will look in /img/(Bset) for them
var search = ""; //Search string
var searchR = RegExp(); //Search RegExp
var useRegExp = false; //Use reGExp search? Instead of plain text?
var httpVars = new Array(); //URL vars, an array of [var, value]
var skipGag = false; //Skip any hilarius april fools gags

//This gets all the vars in the URL, and sets things to them
function getHttpVars(){
	httpVars = location.search.replace("?", "&").split("&");
	for(var i = 0; i < httpVars.length; i++){
		httpVars[i] = httpVars[i].split("=");
		
		if(httpVars[i][0] == "user"){
			userName = httpVars[i][1];
			run();
		}
		
		if(httpVars[i][0] == "size"){
			size = httpVars[i][1];
		}
		
		if(httpVars[i][0] == "set"){
			Bset = httpVars[i][1];
		}
		
		if(httpVars[i][0] == "skipGag"){
			skipGag = true;
		}
	}
}
