/*
	Rosa Tung
	Riot API Example
	riotApiTest.js
*/

//https://lostechies.com/gabrielschenker/2009/03/10/javascript-access-properties-of-a-complex-json-object/
/*var findValue = function(item, name) { //access properties of a complex JSON object
    var token = /\w+/g;
    var results = name.match(token);
    var temp = item;
    for (var i = 0; i < results.length; i++)
        temp = temp[results[i]];
    return temp;
}  
var stringSummoner = summonerName + ".id"; //summonerName.id as a string
console.log(findValue(response, stringSummoner));*/


function searchSummoner(){
	function getSummoner(){ //get user input
		return document.getElementById('summonerName').value;
	}
	
	var summonerName = getSummoner(); //store user input
	
	var req = new XMLHttpRequest(); //create XMLHttpRequest Object (used to exchange data with a server)
	req.open("GET", "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + summonerName + 
					"?api_key=edd641e1-be3f-4ffa-aa56-64945420b0ba", true); 

	req.send(null); //GET request, so not sending anything
    req.addEventListener('load', function(){
		var response = JSON.parse(req.responseText); //get response text from request
		console.log(response[summonerName]["id"]);
		document.getElementById('summonerID').textContent = response[summonerName]["id"];
		//document.getElementById('summonerLevel').textContent = response.summonerLevel;
	});
	event.preventDefault();
}

/*{"misspapaya":{
		"id":22977975,
		"name":"missPapaya",
		"profileIconId":983,
		"summonerLevel":30,
		"revisionDate":1451798706000
		}}*/
		
/*response["blah"]["blah"]
response.summonerName.id*/
		//console.log(response.misspapaya.id);