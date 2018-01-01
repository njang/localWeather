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

let tempUnitCelsius = true;

const onSuccess = (response) => {
	// let locElement = `${response.coord.lon > 0 ? response.coord.lon + "E": -response.coord.lon + "W"}, ${response.coord.lat > 0 ? response.coord.lat + "N" : -response.coord.lat + "S"}`;
  // $('#displayLocation').text(locElement);
  $('#displayLocation').text("Springfield, US");
	// display the weather condition here.  
	$('#displayWeather').text(response.weather[0].main);
  $('#displayTemp').text(response.main.temp);  

  $('#tempUnit').click(() => {
    if (tempUnitCelsius) {    
      $('#displayTemp').text(32 + response.main.temp * 9 / 5);
      $('#tempUnit').text("F");
    } else {
      $('#displayTemp').text(response.main.temp);
      $('#tempUnit').text("C");
    }
    tempUnitCelsius = !tempUnitCelsius;
  });

  // console.log(response);
  // debugger;
}



$(document).ready(getLocation());
