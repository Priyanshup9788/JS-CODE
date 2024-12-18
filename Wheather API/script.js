
let curr_weather = document.getElementById("current-weather");
let srch_btn = document.getElementById("search-btn");

let xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=surat&appid=63a1352c6a4f02877198706cd5060c15", true);

xhr.onload = function () {
    if (xhr.status == 200 || xhr.status === 201) {

        let response = JSON.parse(xhr.responseText);

        curr_weather.innerHTML = `
                <h1 id="city-name">${response.name}</h1>
                <div class="weather-info">
                <p id="temperature">${(response["main"]["temp"] - 273.15).toFixed(2)}°C</p>
                <p id="weather-description">${response.weather[0].description}</p>
                <p id="wind-speed">Wind: ${response.wind.speed} km/h</p>
                <p id="humidity">Humidity: ${response.main.humidity}%</p>
                <p id="feels-like">Feels Like: ${(response.main.feels_like - 273.15).toFixed(2)}°C</p>
            </div>
            `

    }
    else {
        alert("invalid city name");
        document.getElementById("city-search").value='';
        console.log(xhr.status);
    }
}

xhr.send();

srch_btn.addEventListener("click", renderweather);

function renderweather() {

    let cityname=document.getElementById("city-search").value;
    

    xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=63a1352c6a4f02877198706cd5060c15`, true);

    xhr.onload = function () {
        if (xhr.status == 200 || xhr.status === 201) {

            let response = JSON.parse(xhr.responseText);

            curr_weather.innerHTML = `
                <h1 id="city-name">${response.name}</h1>
                <div class="weather-info">
                <p id="temperature">${(response["main"]["temp"] - 273.15).toFixed(2)}°C</p>
                <p id="weather-description">${response.weather[0].description}</p>
                <p id="wind-speed">Wind: ${response.wind.speed} km/h</p>
                <p id="humidity">Humidity: ${response.main.humidity}%</p>
                <p id="feels-like">Feels Like: ${(response.main.feels_like - 273.15).toFixed(2)}°C</p>
            </div>
            `

        }
        else {
            alert("invalid city name");
            document.getElementById("city-search").value='';
            console.log(xhr.status);
        }
    }

    xhr.send();

}