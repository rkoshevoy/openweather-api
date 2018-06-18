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
          var widget = showCurrentWeather(data);
          $('#showWeather').html(widget);
          $('#city').val('');
        },
        error: function() {
          alert('Wrong city name. You must enter name in english')
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
        var widget = showCurrentWeather(data);
        $('#showWeather').html(widget);
      }
    });
  }

  navigator.geolocation.getCurrentPosition(getCoordinates);
});

function showCurrentWeather(data) {

  function timeFormatting(time) {
    var date = new Date(time * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;
  };

  return '<p><strong>Weather in ' + data.name + ', ' + data.sys.country + '</strong></p>' +
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
    '</table>'
};
