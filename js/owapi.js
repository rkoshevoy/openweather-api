$(document).ready(function() {
  $('#getWeather').click(function(e) {
    e.preventDefault();

    var city = $('#city').val();

    if (city != '') {

      $('#error').html('');

      $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city +
          '&units=metric' +
          '&APPID=8eb3e1f5948dfaa9255d77de0dc82b42',
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
          var currentWeatherWidget = showCurrentWeather(data);
          $('#showCurrentWeather').html(currentWeatherWidget);
          $('#city').val('');
        },
        error: function() {
          alert('Wrong city name. You must enter name in english')
        }
      });

      $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city +
          '&units=metric' +
          '&APPID=8eb3e1f5948dfaa9255d77de0dc82b42',
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
          var weeklyWeatherWidget = showWeeklyWeather(data);
          $('#showWeeklyWeather').html(weeklyWeatherWidget);
        }
      });

    } else {
      $('#error').html('<div class="alert alert-warning alert-dismissible fade show" role="alert">Field can not be empty<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
    }
  })

  function getCoordinates(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude +
        '&units=metric' +
        '&APPID=8eb3e1f5948dfaa9255d77de0dc82b42',
      type: 'GET',
      dataType: 'jsonp',
      success: function(data) {
        var currentWeatherWidget = showCurrentWeather(data);
        $('#showCurrentWeather').html(currentWeatherWidget);
      }
    });

    $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude +
        '&units=metric' +
        '&APPID=8eb3e1f5948dfaa9255d77de0dc82b42',
      type: 'GET',
      dataType: 'jsonp',
      success: function(data) {
        var weeklyWeatherWidget = showWeeklyWeather(data);
        $('#showWeeklyWeather').html(weeklyWeatherWidget);
      }
    });
  }

  navigator.geolocation.getCurrentPosition(getCoordinates);
});

function timeFormatting(time) {
  var date = new Date(time * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return formattedTime;
};

function showCurrentWeather(data) {

  var currentWeatherData = '<p><strong>Current weather in ' + data.name + ', ' + data.sys.country + '</strong></p>' +
    '<p><img src="//openweathermap.org/img/w/' + data.weather[0].icon + '.png">' + parseInt(data.main.temp) + '°' +
    '</p>' +
    '<tr>' +
    '<table>' +
    '<tr>' +
    '<td>Cloudiness</td>' +
    '<td>' + data.weather[0].main + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td>Wind speed</td>' +
    '<td>' + data.wind.speed + ' m/s</td>' +
    '</tr>' +
    '<tr>' +
    '<td>Pressure</td>' +
    '<td>' + data.main.pressure + ' hpa</td>' +
    '</tr>' +
    '<tr>' +
    '<td>Humidity</td>' +
    '<td>' + data.main.humidity + '%</td>' +
    '</tr>' +
    '<tr>' +
    '<td>Sunrise</td>' +
    '<td>' + timeFormatting(data.sys.sunrise) + '</td>' +
    '</tr>' +
    '<tr>' +
    '<td>Sunset</td>' +
    '<td>' + timeFormatting(data.sys.sunset) + '</td>' +
    '</tr>' +
    '</table>';

  return currentWeatherData;
};

function showWeeklyWeather(data) {

  var weeklyWeatherCityInfo = '<p><strong>Weekly weather in ' + data.city.name + ', ' + data.city.country + '</strong></p>';
  var weeklyWeatherData = [];

  for (var i = 0; i < data.list.length; i++) {
    var weeklyWeatherDataItem = '<p><img src="//openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png">' + parseInt(data.list[i].main.temp) + '°' +
      '</p>' +
      '<tr>' +
      '<table>' +
      '<tr>' +
      '<td>Cloudiness</td>' +
      '<td>' + data.list[i].weather[0].main + '</td>' +
      '</tr>' +
      '<tr>' +
      '<td>Wind speed</td>' +
      '<td>' + data.list[i].wind.speed + ' m/s</td>' +
      '</tr>' +
      '<tr>' +
      '<td>Pressure</td>' +
      '<td>' + data.list[i].main.pressure + ' hpa</td>' +
      '</tr>' +
      '<tr>' +
      '<td>Humidity</td>' +
      '<td>' + data.list[i].main.humidity + '%</td>' +
      '</tr>' +
      '<tr>' +
      '<td>Humidity</td>' +
      '<td>' + data.list[i].main.humidity + '%</td>' +
      '</tr>' +
      '<tr>' +
      '<td>Time</td>' +
      '<td>' + data.list[i].dt_txt + '</td>' +
      '</tr>' +
      '</table>';

    weeklyWeatherData.push(weeklyWeatherDataItem);
  }

  return weeklyWeatherCityInfo + weeklyWeatherData;
};
