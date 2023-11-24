render("Sydney");

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
    document.querySelector(
      "#temp"
    ).textContent = `${weatherCurrent.current.temp_c}°C`;
  } else {
    // Current Weather (°F)
    document.querySelector(
      "#temp"
    ).textContent = `${weatherCurrent.current.temp_f}°F`;
  }

  // Current Weather Icon
  const selectWeatherIcon = document.querySelector("#main-icon");
  selectWeatherIcon.src = weatherCurrent.current.condition.icon;

  // Feels Like
  if (document.querySelector("#temp-unit-toggle").className === "c") {
    // Feels Like (°C)
    document.querySelector(
      "#feelslike"
    ).innerHTML = `${weatherCurrent.current.feelslike_c} <span class="unit">°C</span>`;
  } else {
    // Feels Like (°F)
    document.querySelector(
      "#feelslike"
    ).innerHTML = `${weatherCurrent.current.feelslike_f} <span class="unit">°F</span>`;
  }

  // Humidity
  const humidity = weatherCurrent.current.humidity;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${humidity} <span class="unit">%</span>`;

  // Wind speed
  if (document.querySelector("#temp-unit-toggle").className === "c") {
    // Wind speed (kph)
    document.querySelector(
      "#wind-speed"
    ).innerHTML = `${weatherCurrent.current.wind_kph} <span class="unit">km/h</span>`;
  } else {
    // Wind speed (mph)
    document.querySelector(
      "#wind-speed"
    ).innerHTML = `${weatherCurrent.current.wind_mph} <span class="unit">mph</span>`;
  }
}

async function getForecastWeather(loc) {
  const responseForecast = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=5d4c1b2bf46e4f9583d60621232011&q=${loc}`
  );

  // FORECAST API
  const weatherForecast = await responseForecast.json();

  // Chance of Rain
  document.querySelector(
    "#rain-chance"
  ).innerHTML = `${weatherForecast.forecast.forecastday[0].day.daily_chance_of_rain} <span class="unit">%</span>`;

  // HOURLY FORECAST

  // Local Time
  const date = new Date(weatherForecast.location.localtime);
  function getFutureHoursFull(i) {
    if (i < 24) {
      return new Date(weatherForecast.forecast.forecastday[0].hour[i].time);
    } else {
      return new Date(
        weatherForecast.forecast.forecastday[0].hour[i - 24].time
      );
    }
  }
  function getFutureHour24(i) {
    if (i < 24) {
      return i;
    } else {
      return i - 24;
    }
  }

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
  const currentHour24 = date.getHours(); // "14" for  or "2"

  // Current Hour Name 12H
  const currentHour12 = longHour.format(date); // "2 pm"

  document.querySelector("#hour-name-1").textContent = currentHour12;
  document.querySelector("#hour-name-2").textContent = longHour.format(
    getFutureHoursFull(currentHour24 + 1)
  );
  document.querySelector("#hour-name-3").textContent = longHour.format(
    getFutureHoursFull(currentHour24 + 2)
  );
  document.querySelector("#hour-name-4").textContent = longHour.format(
    getFutureHoursFull(currentHour24 + 3)
  );
  document.querySelector("#hour-name-5").textContent = longHour.format(
    getFutureHoursFull(currentHour24 + 4)
  );

  // Hourly Temp
  if (document.querySelector("#temp-unit-toggle").className === "c") {
    // Hourly Temp (°C)
    document.querySelector(
      "#hour-temp-1"
    ).textContent = `${weatherForecast.forecast.forecastday[0].hour[currentHour24].temp_c} °C`;
    document.querySelector("#hour-temp-2").textContent = `${
      weatherForecast.forecast.forecastday[0].hour[
        getFutureHour24(currentHour24 + 1)
      ].temp_c
    } °C`;
    document.querySelector("#hour-temp-3").textContent = `${
      weatherForecast.forecast.forecastday[0].hour[
        getFutureHour24(currentHour24 + 2)
      ].temp_c
    } °C`;
    document.querySelector("#hour-temp-4").textContent = `${
      weatherForecast.forecast.forecastday[0].hour[
        getFutureHour24(currentHour24 + 3)
      ].temp_c
    } °C`;
    document.querySelector("#hour-temp-5").textContent = `${
      weatherForecast.forecast.forecastday[0].hour[
        getFutureHour24(currentHour24 + 4)
      ].temp_c
    } °C`;
  } else {
    // Hourly Temp (°F)
    document.querySelector(
      "#hour-temp-1"
    ).textContent = `${weatherForecast.forecast.forecastday[0].hour[currentHour24].temp_f} °F`;
    document.querySelector("#hour-temp-2").textContent = `${
      weatherForecast.forecast.forecastday[0].hour[
        getFutureHour24(currentHour24 + 1)
      ].temp_f
    } °F`;
    document.querySelector("#hour-temp-3").textContent = `${
      weatherForecast.forecast.forecastday[0].hour[
        getFutureHour24(currentHour24 + 2)
      ].temp_f
    } °F`;
    document.querySelector("#hour-temp-4").textContent = `${
      weatherForecast.forecast.forecastday[0].hour[
        getFutureHour24(currentHour24 + 3)
      ].temp_f
    } °F`;
    document.querySelector("#hour-temp-5").textContent = `${
      weatherForecast.forecast.forecastday[0].hour[
        getFutureHour24(currentHour24 + 4)
      ].temp_f
    } °F`;
  }

  // Hourly Weather Icon
  document.querySelector("#hour-icon-1").src =
    weatherForecast.forecast.forecastday[0].hour[currentHour24].condition.icon;
  document.querySelector("#hour-icon-2").src =
    weatherForecast.forecast.forecastday[0].hour[
      getFutureHour24(currentHour24 + 1)
    ].condition.icon;
  document.querySelector("#hour-icon-3").src =
    weatherForecast.forecast.forecastday[0].hour[
      getFutureHour24(currentHour24 + 2)
    ].condition.icon;
  document.querySelector("#hour-icon-4").src =
    weatherForecast.forecast.forecastday[0].hour[
      getFutureHour24(currentHour24 + 3)
    ].condition.icon;
  document.querySelector("#hour-icon-5").src =
    weatherForecast.forecast.forecastday[0].hour[
      getFutureHour24(currentHour24 + 4)
    ].condition.icon;
}

const searchBtn = document.querySelector("#search-button");

searchBtn.addEventListener("click", () => {
  let searchTerm = document.querySelector("#search-input").value;
  render(searchTerm);
  document.querySelector("#search-input").value = "";
  const errorMessage = document.querySelector(".error");
  errorMessage.style.display = "none";
});

function render(cb) {
  getCurrentWeather(cb).catch((err) => {
    const errorMessage = document.querySelector(".error");
    errorMessage.style.display = "block";
  });
  getForecastWeather(cb).catch((err) => {
    const errorMessage = document.querySelector(".error");
    errorMessage.style.display = "block";
  });
  document.querySelector("main").style.display = "flex";
  document.querySelector(".forecast").style.display = "flex";
}

const selectChangeUnits = document.querySelector("#temp-unit-toggle");
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
