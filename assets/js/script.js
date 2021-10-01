var curDate = new Date();
var nextDate = new Date();
const cities = [];

function DisplayWeatherData(data) {
    $("#CurTemp").text(KelvinToFahrenheit(data.current.temp) + "°");
    $("#CurWind").text(data.current.wind_speed) + "Mph";
    $("#CurHum").text(data.current.humidity) + "%";
    $("#CurUvi").text(data.current.uvi);
    for (var i = 0; i < 5; i++) {
        nextDate.setDate(curDate.getDate()+(i+1));
        var formattedDate = DateAsMMDDYY(nextDate);
        $("#Day" + (i+1) + "Date").text(formattedDate);
        var temp = KelvinToFahrenheit(data.daily[i].temp.max);
        $("#Temp" + (i+1)).text(temp + "°");
        var wind = data.daily[i].wind_speed;
        $("#Wind" + (i+1)).text(wind + "Mph");
        var humidity = data.daily[i].humidity;
        $("#Humidity" + (i+1)).text(humidity + "%");
    }
    var cityStrings = "";
    for (var i = 0; i < cities.length; i++) {
        cityStrings = cityStrings + "<li>" + cities[i] + "</li>";
    };
    $("#History").html(cityStrings);
}

function KelvinToFahrenheit(degrees) {
    return parseInt((degrees - 273.15) * 9/5 + 32); 
}

function FetchWeatherData() {
    var city = document.querySelector("#searchBox").value;
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall";
    var latitude = "";
    var longitude = "";

    var found = false;
    cityList.forEach(element => {
        if (element.City == city) {
            $("#CurCityAndDate").text(city);
            cities.push(city);
            latitude = "?lat=" + element.Latitude;
            longitude = "&lon=" + element.Longitude;
            found = true;
        }
    });
    if (!found) {
        alert("City not found. Please try new city.");
        return;
    }
    else {
        fetch(apiURL + latitude + longitude + "&exclude=minutely,hourly&appid=d744ae3712d48098b8817bc0db636ae4")
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                console.log(response);
                DisplayWeatherData(response);
            })
    };
}

function DateAsMMDDYY(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return month + '/' + day + '/' + year;
}

const cityList = [
    
    { "City" : "New York", "Latitude" : "40.7128", "Longitude" : "74.006" },
    { "City" : "High Bridge", "Latitude" : "40.6670", "Longitude" : "74.8957" },
    { "City" : "Chicago", "Latitude" : "41.8781", "Longitude" : "87.6298" },
];
