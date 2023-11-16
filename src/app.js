let searchForm = document.querySelector("#weather-search-form");
searchForm.addEventListener("submit", citySearchSubmit);

function citySearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    searchCity(searchInput.value);
}

function searchCity(city){
    let apiKey = "04dtb32bf653942046oabf5b636577a0";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

    axios.get(apiUrl).then(function (response) {
        city = response.data.city;
        let cityElement = document.querySelector("#search-city");
        cityElement.innerHTML = city;
        let iconElement = document.querySelector("#icon");
        let iconSrc = response.data.condition.icon_url;
        icon =`<image class="search-icon" src="${iconSrc}"/>`
        iconElement.innerHTML = icon;
        let temperatureElement = document.querySelector("#search-temperature");
        let temperature = Math.round(response.data.temperature.current);
        temperatureElement.innerHTML = temperature;
        let dateElement = document.querySelector("#search-now");
        let date = new Date (response.data.time * 1000);
        dateElement.innerHTML = currentDate(date);
        let conditionElement = document.querySelector("#search-condition");
        let condition = response.data.condition.description;
        conditionElement.innerHTML = condition;
        let humidityElement = document.querySelector("#search-humidity");
        let humidity = response.data.temperature.humidity;
        humidityElement.innerHTML = humidity;
        let windElement = document.querySelector("#search-wind");
        let wind = response.data.wind.speed;
        windElement.innerHTML = wind;
        getForecast(city);
    });
}

function currentDate(date){
    let day = date.getDay();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    day = days[day];

    if (hours < 10) {
        hours = `0${hours}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date (timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
}

function displayForecast(response){
    let forecastHtml = "";
    
    response.data.daily.forEach(function(day, index) {
        if (index < 5) {
            forecastHtml = forecastHtml + `
            <div class="col-2">
                <div class="forecast-date">${formatDay(day.time)}</div>
                <div>
                    <image
                    src="${day.condition.icon_url}"
                    class="forecast-icon"
                    ></image>
                </div>
                <div class="forecast-temp">
                    <div class="forecast-temperature">${Math.round(day.temperature.day)}</div>
                    <div class="forecast-temperature-unit">°C</div>
                </div>
            </div>`;
        }
    })

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

function getForecast(city){
    let apiKey = "04dtb32bf653942046oabf5b636577a0";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    
    axios(apiUrl).then(displayForecast);
}

searchCity("kl");