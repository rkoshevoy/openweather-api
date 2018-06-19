$(document).ready(function() {

  $('#getWeather').click(function(e) {
    e.preventDefault();

    $('.weather-loading').addClass('weather-loading-visible');

    var city = $('#city').val();

    if (city != '') {

      setTimeout(function() {
        $('#showWeeklyWeather .city-name').remove();
        $('#showWeeklyWeather .swiper-wrapper').html('');
      }, 100);

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
          alert('Wrong city name!')
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
          $('.weather-loading').removeClass('weather-loading-visible');

          var mySwiper = new Swiper('.swiper-container', {
            slidesPerView: 4,
            spaceBetween: 20,
            navigation: {
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next'
            },
            breakpoints: {
              1199: {
                slidesPerView: 3
              },
              767: {
                slidesPerView: 2
              },
              400: {
                slidesPerView: 1
              }
            }
          })
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
        $('.weather-loading').removeClass('weather-loading-visible');

        var mySwiper = new Swiper('.swiper-container', {
          slidesPerView: 4,
          spaceBetween: 20,
          navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next'
          },
          breakpoints: {
            1199: {
              slidesPerView: 3
            },
            767: {
              slidesPerView: 2
            },
            400: {
              slidesPerView: 1
            }
          }
        })
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

  var currentWeatherData = '<p class="city-name">Weather in ' + data.name + ', ' + data.sys.country + '</p>' +
    '<p class="temp"><img src="//openweathermap.org/img/w/' + data.weather[0].icon + '.png">' + parseInt(data.main.temp) + '°</p>' +
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

  function currentTime(date) {
    date = date.substr(0, date.length - 3);
    return date;
  };

  var weeklyWeatherCityInfo = '<p class="city-name">Weekly weather in ' + data.city.name + ', ' + data.city.country + '</p>';

  for (var i = 0; i < data.list.length; i++) {
    var weeklyWeatherDataItem = '<div class="weather-item swiper-slide">' +
      '<div class="weather-item-main">' +
      '<p>' + currentTime(data.list[i].dt_txt) + '</p>' +
      '<p class="temp"><img src="//openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png">' + parseInt(data.list[i].main.temp) + '°</p>' +
      '</div>' +
      '<div class="weather-item-details">' +
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
      '</table>' +
      '</div>' +
      '</div>'

    $('#showWeeklyWeather .swiper-wrapper').html($('#showWeeklyWeather .swiper-wrapper').html() + weeklyWeatherDataItem);
  }

  var weeklyWeather = weeklyWeatherCityInfo + $('#showWeeklyWeather').html();

  return weeklyWeather;
};
