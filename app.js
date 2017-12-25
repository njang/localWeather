const endpoint = 'https://fcc-weather-api.glitch.me/api/current';

var x = document.getElementById("geoloc");
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

const getWeather = (position) => {
  // x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude; 
  $.get(endpoint + '?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude, (response) => {
		onSuccess(response);
	});
}

let z;

const onSuccess = (response) => {
	// display the weather condition here.
	z = response;
	let y = `Temp: ${response.main.temp}`;
	$('#display').text = y;
  console.log(response);
  // debugger;
}

const convert = () => {

}

$(document).ready(getLocation());
