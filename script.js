const searchButton = document.querySelector("#searchIcon");
const cityCountry = document.querySelector(".city_country");
const temperature = document.querySelector(".temp");
const weatherDescription = document.querySelector(".weather_description");
const weatherImage = document.querySelector(".weather_icon");
const windIndicator = document.querySelector("#wind_indicator");
const humidityIndicator = document.querySelector("#humidity_indicator");
const maxTempIndicator = document.querySelector("#max_temp_indicator");
const middleUpperDiv = document.querySelector(".middle-upper");
const inputField = document.querySelector("#userInput");
const feelsLike = document.querySelector(".feels_like");

const apiKey = "309686f5d1b5556701ea19ed878a2fa1";

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    if (data.cod == "404") {
      cityCountry.innerHTML = "location not found";
    } else {
      cityCountry.innerHTML = data.name;
      const integerTemp = Math.round(data.main.temp);

      temperature.innerHTML = `${integerTemp}<span class="celsius">°C</span>`;
      weatherDescription.innerHTML = data.weather[0].description;
    }

    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;

    const currentTime = new Date().getTime() / 1000;

    const weatherConditions = data.weather[0].main;
    const isRaining = weatherConditions === "Rain";
    const isSunny = weatherConditions === "Clear";
    const isCloudy = weatherConditions === "Clouds";
    const isSnowing = weatherConditions === "Snow";
    const isHaze = weatherConditions === "Haze";
    const isDrizzle = weatherConditions === "Drizzle";

    switch (true) {
      case isRaining && currentTime > sunrise && currentTime < sunset:
        // it's daytime and raining
        weatherImage.src = "./icons/weather-icons/day-raining.svg";
        break;
      case isSunny && currentTime > sunrise && currentTime < sunset:
        // it's daytime and sunny
        weatherImage.src = "./icons/weather-icons/day-clear.svg";
        break;
      case isCloudy && currentTime > sunrise && currentTime < sunset:
        // it's daytime and cloudy
        weatherImage.src = "./icons/weather-icons/day-cloudy.svg";
        break;
      case isSnowing && currentTime > sunrise && currentTime < sunset:
        // it's daytime and snowing
        weatherImage.src = "./icons/weather-icons/day-snowing.svg";
        break;
      case isHaze && currentTime > sunrise && currentTime < sunset:
        // it's daytime and hazy
        weatherImage.src = "./icons/weather-icons/day-clear.svg";
        break;
      case isDrizzle && currentTime > sunrise && currentTime < sunset:
        // it's daytime and drizzle
        weatherImage.src = "./icons/weather-icons/day-raining.svg";
        break;

      case isRaining && currentTime > sunset:
        // it's nighttime and raining
        weatherImage.src = "./icons/weather-icons/night-raining.svg";
        break;
      case isSunny && currentTime > sunset:
        // it's nighttime and sunny
        weatherImage.src = "./icons/weather-icons/night-clear.svg";
        break;
      case isCloudy && currentTime > sunset:
        // it's nighttime and cloudy
        weatherImage.src = "./icons/weather-icons/night-cloudy.svg";
        break;
      case isSnowing && currentTime > sunset:
        // it's nighttime and snowing
        weatherImage.src = "./icons/weather-icons/night-snowing.svg";
        break;
      case isHaze && currentTime > sunset:
        // it's nighttime and hazy
        weatherImage.src = "./icons/weather-icons/night-clear.svg";
        break;
      case isDrizzle && currentTime > sunset:
        // it's nighttime and drizzle
        weatherImage.src = "./icons/weather-icons/night-raining.svg";
        break;
      default:
        // default image
        weatherImage.src = "./icons/weather-icons/day-clear.svg";
        break;
    }
    const integerFeelsLike = Math.round(data.main.feels_like);
    feelsLike.innerHTML = `feels like ${integerFeelsLike}<span class="celsius">°C</span>`;

    windIndicator.innerHTML = data.wind.speed;
    humidityIndicator.innerHTML = data.main.humidity;
    maxTempIndicator.innerHTML = Math.round(data.main.temp_max);
  } catch (error) {
    console.log(error);
  }
}

searchButton.addEventListener("click", () => {
  getWeatherData(inputField.value);
});

inputField.addEventListener("keyup", function (e) {
  //13 is keycode of enter key
  if (e.keyCode === 13) {
    e.preventDefault();
    getWeatherData(inputField.value);
  }
});
