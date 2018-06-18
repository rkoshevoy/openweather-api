$(document).ready(function(){
  $('#submitButton').click(function(e){
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
        success: function(data){
          var widget = show(data);

          $('#showWeather').html(widget);
          $('#city').val('');
        },
        error: function(){
          alert('Wrong city name. You must enter name in english')
        }
      });

    } else {
      $('#error').html('<div class="alert alert-warning alert-dismissible fade show" role="alert">Field can not be empty<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
    }
  })

  function getCoordinates(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude +
      '&units=metric' +
      '&APPID=8eb3e1f5948dfaa9255d77de0dc82b42',
      type: 'GET',
      dataType: 'jsonp',
      success: function(data){
        var widget = show(data);

        $('#showWeather').html(widget);
      }
    });
  }

  navigator.geolocation.getCurrentPosition(getCoordinates);
});

function show(data) {
  return '<p><strong>Weather in ' + data.name + '</strong></p>' +

        '<p><img src="//openweathermap.org/img/w/' + data.weather[0].icon +'.png">' + '</p>' +
        '<p>Temperature: ' + parseInt(data.main.temp) + '°</p>' +
        '<p>Pressure: ' + data.main.pressure + ' Pa</p>'+
        '<p>Humidity: ' + data.main.humidity + '%</p>'+
        '<p>Wind speed: ' + data.wind.speed + ' kph</p>'
};
