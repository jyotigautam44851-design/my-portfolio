async function getWeather() {

    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value.trim();

    const error = document.getElementById("error");
    const forecastContainer = document.getElementById("forecast");

    if (city === "") {
        error.innerText = "Please enter a city name.";
        return;
    }

    try {

        error.innerText = "";
        forecastContainer.innerHTML = "";

        // -------------------------------
        // STEP 1: Find City
        // -------------------------------

        const locationURL =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

        const locationResponse = await fetch(locationURL);

        if (!locationResponse.ok) {
            throw new Error("Location search failed");
        }

        const locationData = await locationResponse.json();

        if (!locationData.results || locationData.results.length === 0) {
            throw new Error("City not found");
        }

        const location = locationData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;


        // -------------------------------
        // STEP 2: Get Weather
        // -------------------------------

        const weatherURL =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

        const weatherResponse = await fetch(weatherURL);

        if (!weatherResponse.ok) {
            throw new Error("Weather data failed");
        }

        const weatherData = await weatherResponse.json();


        // -------------------------------
        // STEP 3: Display Current Weather
        // -------------------------------

        document.getElementById("city").innerText =
            `${location.name}, ${location.country_code}`;

        document.getElementById("temperature").innerText =
            `${Math.round(weatherData.current.temperature_2m)}°C`;

        document.getElementById("description").innerText =
            getWeatherDescription(weatherData.current.weather_code);

        document.getElementById("humidity").innerText =
            `${weatherData.current.relative_humidity_2m}%`;

        document.getElementById("wind").innerText =
            `${Math.round(weatherData.current.wind_speed_10m)} km/h`;

        document.getElementById("feels").innerText =
            `${Math.round(weatherData.current.apparent_temperature)}°C`;

        document.getElementById("icon").innerText =
            getWeatherEmoji(weatherData.current.weather_code);


        // -------------------------------
        // STEP 4: 5 Day Forecast
        // -------------------------------

        showForecast(weatherData);

    }

    catch (error) {

        console.log(error);

        document.getElementById("error").innerText =
            "❌ City not found. Please enter a valid city.";

        document.getElementById("forecast").innerHTML = "";

    }
}


// ======================================
// 5 DAY FORECAST
// ======================================

function showForecast(data) {

    const forecastContainer =
        document.getElementById("forecast");

    forecastContainer.innerHTML = "";

    const dates = data.daily.time;
    const maxTemps = data.daily.temperature_2m_max;
    const minTemps = data.daily.temperature_2m_min;
    const weatherCodes = data.daily.weather_code;


    for (let i = 0; i < 5; i++) {

        const date = new Date(dates[i]);

        const day = date.toLocaleDateString("en-US", {
            weekday: "short"
        });

        const maxTemp = Math.round(maxTemps[i]);
        const minTemp = Math.round(minTemps[i]);

        const emoji = getWeatherEmoji(weatherCodes[i]);

        const condition =
            getWeatherDescription(weatherCodes[i]);


        const card = document.createElement("div");

        card.className = "forecast-card";

        card.innerHTML = `
            <h4>${day}</h4>

            <div class="forecast-icon">
                ${emoji}
            </div>

            <p>${maxTemp}°C / ${minTemp}°C</p>

            <p>${condition}</p>
        `;

        forecastContainer.appendChild(card);
    }
}


// ======================================
// WEATHER DESCRIPTION
// ======================================

function getWeatherDescription(code) {

    if (code === 0) {
        return "Clear Sky";
    }

    if (code === 1) {
        return "Mainly Clear";
    }

    if (code === 2) {
        return "Partly Cloudy";
    }

    if (code === 3) {
        return "Cloudy";
    }

    if (code === 45 || code === 48) {
        return "Foggy";
    }

    if (code >= 51 && code <= 57) {
        return "Drizzle";
    }

    if (code >= 61 && code <= 67) {
        return "Rainy";
    }

    if (code >= 71 && code <= 77) {
        return "Snowy";
    }

    if (code >= 80 && code <= 82) {
        return "Rain Showers";
    }

    if (code === 85 || code === 86) {
        return "Snow Showers";
    }

    if (code >= 95) {
        return "Thunderstorm";
    }

    return "Weather";
}


// ======================================
// WEATHER EMOJI
// ======================================

function getWeatherEmoji(code) {

    if (code === 0) {
        return "☀️";
    }

    if (code === 1 || code === 2) {
        return "🌤️";
    }

    if (code === 3) {
        return "☁️";
    }

    if (code === 45 || code === 48) {
        return "🌫️";
    }

    if (code >= 51 && code <= 57) {
        return "🌦️";
    }

    if (code >= 61 && code <= 67) {
        return "🌧️";
    }

    if (code >= 71 && code <= 77) {
        return "❄️";
    }

    if (code >= 80 && code <= 82) {
        return "🌧️";
    }

    if (code === 85 || code === 86) {
        return "🌨️";
    }

    if (code >= 95) {
        return "⛈️";
    }

    return "🌤️";
}


// ======================================
// ENTER KEY
// ======================================

document.getElementById("cityInput")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {
            getWeather();
        }

    });