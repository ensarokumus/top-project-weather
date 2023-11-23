async function getCurrentWeather(loc) {
  const responseCurrent = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=5d4c1b2bf46e4f9583d60621232011&q=${loc}`
  );

  // CURRENT API

  const weatherCurrent = await responseCurrent.json();

  // Weather Description
  const weatherDesc = weatherCurrent.current.condition.text;
  document.querySelector("#temp-desc").textContent = weatherDesc;

  // Location Info
  const locationName = weatherCurrent.location.name;
  document.querySelector("#location").textContent = locationName;

  // Date info
  const date = new Date(weatherCurrent.location.localtime);

  // Formatted Date
  document.querySelector("#date").textContent = date.toLocaleDateString(
    "en-gb",
    {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  // Time info from Date
  const shortTime = new Intl.DateTimeFormat("en", {
    timeStyle: "short",
  });

  document.querySelector("#time").textContent = shortTime.format(date); // "1:31 PM"

  // Current Weather
  if (document.querySelector("#temp-unit-toggle").className === "c") {
    // Current Weather (°C)
    document.querySelector("#temp").textContent = `${weatherCurrent.current.temp_c} °C`;
  } else {
    // Current Weather (°F)
    document.querySelector("#temp").textContent = `${weatherCurrent.current.temp_f} °F`;
  }

  // Current Weather Icon
  const selectWeatherIcon = document.querySelector("#main-icon");
  selectWeatherIcon.src = weatherCurrent.current.condition.icon;

  // Feels Like 
  if (document.querySelector("#temp-unit-toggle").className === "c") {
    // Feels Like (°C)
    document.querySelector("#feelslike").textContent = `${weatherCurrent.current.feelslike_c} °C`;
  } else {
    // Feels Like (°F)
    document.querySelector("#feelslike").textContent = `${weatherCurrent.current.feelslike_f} <span class="unit">°F</span>`;
  }

  // Humidity
  // const humidity = weatherCurrent.current.humidity;
  // document.querySelector("#temp-desc").textContent = weatherDesc;
  console.log(`${weatherCurrent.current.humidity} %`);

  // Wind speed (kph)
  console.log(weatherCurrent.current.wind_kph);

  // Wind speed (mph)
  console.log(weatherCurrent.current.wind_mph);
}

async function getForecastWeather(loc) {
  const responseForecast = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=5d4c1b2bf46e4f9583d60621232011&q=${loc}`
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
  console.log(date.getHours()); // "14" for  or "2"

  // Current Hour Name 12H
  console.log(longHour.format(date)); // "2 pm"

  // Hourly Temp (C)
  console.log(
    weatherForecast.forecast.forecastday[0].hour[date.getHours()].temp_c
  );

  // Hourly Temp (F)
  console.log(
    weatherForecast.forecast.forecastday[0].hour[date.getHours()].temp_f
  );

  // Hourly Weather Icon
  console.log(
    weatherForecast.forecast.forecastday[0].hour[date.getHours()].condition.icon
  );
}

const searchBtn = document.querySelector("#search-button");

searchBtn.addEventListener("click", () => {
  let searchTerm = document.querySelector("#search-input").value;
  render(searchTerm);
});

async function render(cb) {
  await getCurrentWeather(cb);
  await getForecastWeather(cb);
  console.log("Render finished!");
}

selectChangeUnits = document.querySelector("#temp-unit-toggle");
selectChangeUnits.addEventListener("click", () => {
  if (selectChangeUnits.className === "c") {
    selectChangeUnits.className = "f";
    selectChangeUnits.textContent = "to °C";
  } else {
    selectChangeUnits.className = "c";
    selectChangeUnits.textContent = "to °F";
  }
  render(document.querySelector("#location").textContent);
});
