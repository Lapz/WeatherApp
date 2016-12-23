function locationHandler(long, lat) {
	// Tempelate string that will contain the url insereted with the users
	return `http://api.openweathermap.org/data/2.5/find?lat=${lat}5&lon=${long}&cnt=2&appid=ae274f9fa95742d9eb8ba702e2259052&units=metric`;
}

function success(pos) {
	var crd = pos.coords;

	var url = locationHandler(crd.longitude, crd.latitude);

	get(dataHandler, url);

}

function error(err) {
	console.warn('ERROR(' + err.code + '): ' + err.message);

	alert("error");
}

function getLocation(success, error) {

	var options = {
		enableHighAccuracy: true,
		timeout: 10000,
		maximumAge: 0
	};

	navigator.geolocation.getCurrentPosition(success, error, options);

	// This calls the sucess function which calls the locationHandler function. This then returns the formatted url which then calls the get function. In that function the updatepage function is then called.
}

function dataHandler(result) {

	var parsedData = JSON.parse(result);

	console.log(parsedData);

	var city = parsedData.list[0].name;

	var temp = parsedData.list[0].main.temp;

	var weather = parsedData.list[0].weather[0].main;

	var weatherID = parsedData.list[0].weather[0].id;

	return [city, temp, weather, weatherID];

}

function get(callback, url) {

	var request = new XMLHttpRequest();

	request.onreadystatechange = function() {
		if (request.status == 200 && request.readyState == 4) {
			var response = request.responseText;

			var stuff = dataHandler(response);

			updatepage(stuff);

		} else if (request.status > 300 && request.status < 515 && request.readyState == 4) {
			alert("error");
		}
	};

	request.open("GET", url);
	request.send();

}


function executeRequest(){

	return{
		data: getLocation(success,error);
	}

}

module.exports = executeRequest();
