// there are a few things that don't quite work just yet - but we are getting there.
    // NOTE to William
        // continue working on the CSS
        // Get 5 day Forecast up and running. 

$(document).ready(function() {
    $('#search001').on('click', function() {
      var value001 = $('#value001').val();
  
      // clear input box
      $('#value001').val('');
  
      search001(value001);
    });
  
    $('.history001').on('click', 'li', function() {
      search001($(this).text());
    });
  
    function generate001(text) {
      var li = $('<li>').addClass('list-group-item list-group-item-action').text(text);
      $('.history001').append(li);
    }

// API key for global usage.
var APIkey = '3bb30fcd3337d734195788d660433784'  

function search001(value001) {
    // I prefer to columnize strings of code like this. I 'personally' read better when it's vertical. 
    var queryURL001 = 'https://api.openweathermap.org/data/2.5/weather?q=' 
        + value001 
        + '&APPID=' 
        + APIkey 
        + '&units=imperial'; 
    
    $.ajax({
        url: queryURL001,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            if (history001.indexOf(value001) === -1) {
                history001.push(value001);
                window.localStorage.setItem('history001', JSON.stringify(history001));
                
                generate001(value001);
            }
            // empties today001 field
            $('#today001').empty();

            // constructing the html - was originally going to verticalize these but that might be frustrating for some people. 
            var title001 = $('<h1>').addClass('title001').text(data.name + ' (' + new Date().toLocaleDateString() + ')');
            var card001 = $('<div>').addClass('card001');
            var speed001 = $('<p>').addClass('text001').text('Wind Speed: ' + data.wind.speed + ' MPH');
            var humidity001 = $('<p>').addClass('text001').text('Humidity: ' + data.main.humidity + '%');
            var tempuratur001 = $('<p>').addClass('text001').text('Temperature: ' + data.main.temp + ' °F');
            var body001 = $('<div>').addClass('card001');
            var image001 = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
            
            // appends everything to #today001 in the DOM
            // Plan to try to make the classes more dynamic to allow for better CSS control - 
            // if that makes sense...it's 1:25 AM right now and I don't typically stay up this late but I'm having fun.
            title001.append(
                image001
                );
            body001.append(
                title001, 
                speed001, 
                humidity001, 
                tempuratur001
                );
            card001.append(
                body001
                );
            $('#today001').append(card001);

            forecast001(value001);
            coord001(data.coord.lat, data.coord.lon);
        }
        
    });
}
// This function will eventually be it's own forecast.js file
function forecast001(value001) {
    
    var queryURL002 = 'https://api.openweathermap.org/data/2.5/weather?q=' 
    + value001
    + '&APPID=' 
    + APIkey
    + '&units=imperial'; 
    $.ajax({
        url: queryURL002,
        method: 'GET',
        dataType: 'json',
        success: function(data) {

            $("#forecast001").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

            for (var i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_text.indexOf('15:00:00') !== -1) {
                    var title002 = $('<h4>').addClass('title002').text(new Date(data.list[i].dt_txt).toLocaleDateString());
                    var card002 = $('<div>').addClass('col-md-2');
                    // no speed forecast - originally tried to do this but it doesn't make sense as you can't accurately predict wind speed. 
                    var humidity002 = $('<p>').addClass('card002').text('Humidity: ' + data.list[i].main.humidity + '%');
                    var tempurature002 = $('<p>').addClass('card002').text('Temp: ' + data.list[i].main.temp_max + ' °F');
                    var body002 = $('<div>').addClass('body002 p-2');
                    var image002 = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png');
                    var column001 = $('<div>').addClass('col-md-2');
                    // appends all of the generated html to the DOM
                    column001.append(
                        card002.append(
                        body002.append(
                            title002, 
                            humidity002, 
                            tempurature002, 
                            image002
                        )));
                    $('#forecast002 .row').append(column001);
                } 
            }
        }
    });  
}

// will add on five-day forecast tomorrow. Will also have it's own .js

// find history from local storage for quick access. 
var history001 = JSON.parse(window.localStorage.getItem("history001")) || [];

if (history001.length > 0) {
  search001(history001[history001.length-1]);
}

for (var i = 0; i < history001.length; i++) {
  generate001(history001[i]);
}
});
