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
  // display the location
	let locElement = `${response.coord.lon > 0 ? response.coord.lon + "E": -response.coord.lon + "W"}, ${response.coord.lat > 0 ? response.coord.lat + "N" : -response.coord.lat + "S"}`;
  $('#displayLocation').text(locElement);

	// display the weather condition here.  
	$('#displayWeather').text(response.weather[0].main);
  $('#displayTemp').text(response.main.temp);

  let weatherIcon = document.createElement('img'); 
  weatherIcon.setAttribute('src', response.weather[0].icon);
  weatherIcon.setAttribute('alt', response.weather[0].description);
  $('#displayWeatherIcon').append(weatherIcon);

  $('#tempUnit').click(() => {
    if (tempUnitCelsius) {    
      $('#displayTemp').text(32 + formatDecimal(response.main.temp) * 9 / 5);
      $('#tempUnit').text("F");
    } else {
      $('#displayTemp').text(formatDecimal(response.main.temp));
      $('#tempUnit').text("C");
    }
    tempUnitCelsius = !tempUnitCelsius;
  });

  // console.log(response);
  // debugger;
}

const formatDecimal = (num) => {
  return Math.round(num*10)/10;
}



$(document).ready(getLocation());
