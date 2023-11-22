let locationSelect = "sydney";

async function getCurrentWeather() {
  const responseCurrent = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=5d4c1b2bf46e4f9583d60621232011&q=${locationSelect}`
  );

  // CURRENT API

  const weatherCurrent = await responseCurrent.json();

  // current weather Object from WeatherAPI
  console.log(weatherCurrent);

  // Weather Description
  console.log(weatherCurrent.current.condition.text);

  // Location Info
  console.log(weatherCurrent.location.name);

  // Date info
  const date = new Date(weatherCurrent.location.localtime);

  // Formatted Date
  console.log(
    date.toLocaleDateString("en-gb", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  );

  // Time info from Date
  const shortTime = new Intl.DateTimeFormat("en", {
    timeStyle: "short",
  });
  console.log(shortTime.format(date)); // "1:31 PM"

  // Current Weather (C)
  console.log(weatherCurrent.current.temp_c);

  // Current Weather (F)
  console.log(weatherCurrent.current.temp_f);

  // Current Weather Icon
  const createWeatherIcon = document.createElement("img");
  createWeatherIcon.setAttribute("src", weatherCurrent.current.condition.icon);
  createWeatherIcon.setAttribute("width", "64");
  createWeatherIcon.setAttribute("height", "64");
  document.body.appendChild(createWeatherIcon);
  console.log(weatherCurrent.current.condition.icon);

  // Feels Like (C)
  console.log(weatherCurrent.current.feelslike_c);

  // Feels Like (F)
  console.log(weatherCurrent.current.feelslike_f);

  // Humidity
  console.log(`${weatherCurrent.current.humidity} %`);

  // Wind speed (kph)
  console.log(weatherCurrent.current.wind_kph);

  // Wind speed (mph)
  console.log(weatherCurrent.current.wind_mph);
}

async function getForecastWeather() {
  const responseForecast = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=5d4c1b2bf46e4f9583d60621232011&q=${locationSelect}`
  );

  // FORECAST API

  const weatherForecast = await responseForecast.json();

  // forecast weather Object from WeatherAPI
  console.log(weatherForecast);

  // Chance of Rain
  console.log(
    `${weatherForecast.forecast.forecastday[0].day.daily_chance_of_rain} %`
  );

  // HOURLY FORECAST

  // Local Time
  const date = new Date(weatherForecast.location.localtime);

  // Current time info from Date
  const shortHour = new Intl.DateTimeFormat("en-gb", {
    hour: "numeric",
    hourCycle: "h24",
  });

  const longHour = new Intl.DateTimeFormat("en-gb", {
    hour: "numeric",
    hourCycle: "h12",
  });

  // Current Hour 24H
  console.log(shortHour.format(date)); // "14"

  // Current Hour Name 12H
  console.log(longHour.format(date)); // "2 pm"

  // Hourly Temp (C)
  console.log(
    weatherForecast.forecast.forecastday[0].hour[shortHour.format(date)].temp_c
  );

  // Hourly Temp (F)
  console.log(
    weatherForecast.forecast.forecastday[0].hour[shortHour.format(date)].temp_f
  );

  // Hourly Weather Icon
  console.log(
    weatherForecast.forecast.forecastday[0].hour[shortHour.format(date)]
      .condition.icon
  );
}

// getCurrentWeather();
// getForecastWeather();
