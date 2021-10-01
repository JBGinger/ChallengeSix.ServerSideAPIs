function FetchWeatherData() {
    var city = document.querySelector("#search").value;
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?";
    var latitude = "lat=40.6670";
    var longitude = "&lon=74.8957";
    var date = Date.now();
    
    fetch(apiURL + latitude + longitude + "&dt" + date + "&appid=d744ae3712d48098b8817bc0db636ae4")
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
    })
}
FetchWeatherData();