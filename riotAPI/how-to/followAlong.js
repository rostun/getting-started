function searchSummoner(){
  
	function getSummoner(){ //get user input
		return document.getElementById('aPromisedName').value;
	}
	
	var summonerName = getSummoner(); //store user input
	console.log(summonerName);
	
	var req = new XMLHttpRequest(); //create XMLHttpRequest Object (used to exchange data with a server)
	req.open("GET", "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + summonerName + 
					"?api_key=edd641e1-be3f-4ffa-aa56-64945420b0ba", true); //replace [dev key] with API key
	req.send(); //Sends the request to the server (used for GET)
    req.addEventListener('load', function(){ //listen to what Riot gives us
		console.log(req.responseText);
	});					
}