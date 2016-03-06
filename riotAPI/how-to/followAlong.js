function searchSummoner(){
  console.log("searching summoner");
  
	function getSummoner(){ //get user input
	  console.log("getting summoner");
		return document.getElementById('summonerName').value;
	}
	
	var summonerName = getSummoner(); //store user input
  console.log("got summoner: " + summonerName); 
}