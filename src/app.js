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

searchCity("kl")