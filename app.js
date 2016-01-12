var userLat, userLon, weatherAPI;

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      return weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude.toString() + '&lon=' + position.coords.longitude.toString() + '&APPID=31457b046535940aeeea5440f0af36a3';
    });
}

$(document).ready(function(){
  $('#data').click(function(){
    console.log(weatherAPI);

    $.getJSON(weatherAPI, function(json){
      var html = '';

      html += '<p>' + json.weather[0].description + '</p>';
      console.log(json.weather[0].description);
      html += '<p>' + json.wind.speed + '</p>';
      console.log(json.wind.speed);
      html += '<p>' + json.name + '</p>';
      console.log(json.name);

      $('#data').html(html);
    });
  });
});