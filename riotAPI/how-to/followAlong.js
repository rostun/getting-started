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
		var response = JSON.parse(req.responseText); //get response text from request
		console.log(response);
		console.log(response.misspapaya.id);
		document.getElementById('id').textContent = response.misspapaya.id;
		document.getElementById('name').textContent = response.misspapaya.name;
		document.getElementById('profileIconId').textContent = response.misspapaya.profileIconId;
		document.getElementById('summonerLevel').textContent = response.misspapaya.summonerLevel;
		document.getElementById('revisionDate').textContent = response.misspapaya.revisionDate;
	});					
}

		//console.log(response["misspapaya"]["id"]);
		//console.log(response."aPromisedName".id);
		//console.log(response[aPromisedName]["id"]);