//Geolocation & OpenWeather API project
//Author - Dan Walsh

//defining url components for later use
var baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
var key = '&APPID=31457b046535940aeeea5440f0af36a3';

//accessing user location through geolocation API
function getLocation(){
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCurrentWeatherData);
  } else {
    alert("Geolocation isn't supported by your browser!");
  }
}

//pulling together API call url, making request
function getCurrentWeatherData(position){
  var weatherAPI = baseURL + 'lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + key;
  var xmlhr = new XMLHttpRequest();
  xmlhr.onreadystatechange = function(){
    if(xmlhr.readyState == 4 && xmlhr.status == 200){
      var JSONobj = JSON.parse(xmlhr.responseText);
      Parse(JSONobj);
    }
  }
  xmlhr.open('GET', weatherAPI, true);
  xmlhr.send();
}

//inserting info into HTML 
function Parse(obj){
  var html = '';

  html += '<img id="icon" src="http://openweathermap.org/img/w/' + obj.weather[0].icon + '.png"><br>';
  //html += '<h3>Current weather:</h3>';
  html += '<div class="weatherResult">' + obj.weather[0].description + '</div>';
  //html += '<h3>Current wind speed:</h3>';
  html += '<div class="weatherResult">' + obj.wind.speed + ' m/s</div>';
  //html += '<h3>Current location:</h3>';
  html += '<div class="weatherResult">' + obj.name + '</div>';

  document.getElementById('data').innerHTML = html;
}
