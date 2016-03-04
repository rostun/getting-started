function searchSummoner(){
	function getSummoner(){ //get user input
		return document.getElementById('summonerName').value;
	}
	
	var summonerName = getSummoner(); //store user input
	summonerName = summonerName.toLowerCase().trim(); //what happens when you don't do this step? missPapaya vs misspapaya, adding trim() -> misspapaya with a space at the end
	summonerName = summonerName.replace(" ", ""); //what happens when you don't do this step? Annie Bot vs anniebot
	
	var req = new XMLHttpRequest(); //create XMLHttpRequest Object (used to exchange data with a server)
	req.open("GET", "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + summonerName + 
					"?api_key=edd641e1-be3f-4ffa-aa56-64945420b0ba", true); //replace with [dev key]

	req.send(null); //GET request, so not sending anything
    req.addEventListener('load', function(){
		var response = JSON.parse(req.responseText); //get response text from request //console.log(response[summonerName]["id"]);
		document.getElementById('id').textContent = response[summonerName]["id"];
		document.getElementById('name').textContent = response[summonerName]["name"];
		document.getElementById('profileIconId').textContent = response[summonerName]["profileIconId"];
		document.getElementById('summonerLevel').textContent = response[summonerName]["summonerLevel"];
		document.getElementById('revisionDate').textContent = response[summonerName]["revisionDate"];
		//document.getElementById('summonerLevel').textContent = response.summonerLevel;
	});
	event.preventDefault();
}