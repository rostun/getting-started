function searchByZip(){
	function getZip(){ //get user input
		return document.getElementById('zipCode').value;
	}
	
	var zip = getZip(); //console.log(zip);
	
	var req = new XMLHttpRequest();
	req.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + 
			 ",us&appid=fa7d80c48643dfadde2cced1b1be6ca1" + "&units=imperial", true); 
															//convert kelvin
	req.send(null);
    req.addEventListener('load', function(){
		var response = JSON.parse(req.responseText);
		document.getElementById('temperature').textContent = response.main.temp;
		document.getElementById('humidity').textContent = response.main.humidity;
	});
	event.preventDefault();
}

function searchByCity(){
	function getCity(){ //get user input
		return document.getElementById('cityName').value;
	}
	
	var city = getCity(); //console.log(city);
	
	var req = new XMLHttpRequest();
	req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + city + 
			 ",us&appid=fa7d80c48643dfadde2cced1b1be6ca1" + "&units=imperial", true); 
															//convert kelvin
	req.send(null);
    req.addEventListener('load', function(){
		var response = JSON.parse(req.responseText);
		document.getElementById('temperature').textContent = response.main.temp;
		document.getElementById('humidity').textContent = response.main.humidity;
	});
	event.preventDefault();
}


