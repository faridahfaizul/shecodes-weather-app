let searchForm = document.querySelector("#weather-search-form");
searchForm.addEventListener("submit", citySearchSubmit);

function citySearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    let city = document.querySelector("#search-city");
    city.innerHTML = searchInput.value;
}