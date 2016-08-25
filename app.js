//Geolocation & OpenWeather API project
//Author - Dan Walsh

//defining url components for later use
var baseURL = 'https://api.wunderground.com/api/';
var key = 'redacted';
var cond = '/conditions/q/';
var format = '.json';

//accessing user location through geolocation API
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCurrentWeatherData);
  } else {
    alert("Geolocation isn't supported by your browser!");
  }
}
	
//pulling together API call url, making request
function getCurrentWeatherData(position) {
  var weatherAPI = baseURL + key + cond + position.coords.latitude + ',' + position.coords.longitude + format;
  var xmlhr = new XMLHttpRequest();
  xmlhr.onreadystatechange = function() {
    if (xmlhr.readyState == 4 && xmlhr.status == 200) {
      var JSONobj = JSON.parse(xmlhr.responseText);
      Parse(JSONobj);
    }
  }
  xmlhr.open('GET', weatherAPI, true);
  xmlhr.send();
}

//inserting info into HTML 
function Parse(obj) {
  var html = '';

  html += '<img id="icon" src="' + obj.current_observation.icon_url + '"><br>';
  //html += '<h3>Current weather:</h3>';
  html += '<div class="weatherResult">' + obj.current_observation.weather + '</div>';
  //html += '<h3>Current wind speed:</h3>';
  html += '<div class="weatherResult">' + obj.current_observation.wind_mph + ' m/s wind speed</div>';
  //html += '<h3>Current location:</h3>';
  html += '<div class="weatherResult">' + obj.current_observation.display_location.full + '</div>';

  document.getElementById('data').innerHTML = html;
}
