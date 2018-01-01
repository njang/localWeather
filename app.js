const endpoint = 'https://fcc-weather-api.glitch.me/api/current';

var x = document.getElementById("geoloc");
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

const getWeather = (position) => {
  // x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude; 
  $.get(endpoint + '?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude, (response) => {
		onSuccess(response);
	});
}

const onSuccess = (response) => {
	// display the weather condition here.
	let tempElement = `${response.weather[0].main}, Temp: ${response.main.temp}, Pressure: ${response.main.pressure}, Humidity: ${response.main.humidity}%`;
	$('#displayWeather').text(tempElement);
  let locElement = `${response.coord.lon > 0 ? response.coord.lon + "E": -response.coord.lon + "W"}, ${response.coord.lat > 0 ? response.coord.lat + "N" : -response.coord.lat + "S"}`;
  $('#displayLocation').text(locElement);
  // console.log(response);
  // debugger;
}

const convertUnit = () => {

}

$(document).ready(getLocation());
