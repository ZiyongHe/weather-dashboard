const API_KEY = '39e2855e4e0e8e65b0ab3a0814380f2e'
let data = {
  city: '',
  current: {},
  forecast: [],
}
let history = []

function convertDate(openWeatherDate) {
  const convertedDate = new Date(openWeatherDate * 1000)
  return `${
    convertedDate.getMonth() + 1
  }/${convertedDate.getDate()}/${convertedDate.getFullYear()}`
}

function getWeatherData(city) {
  let lat
  let lon
  // for current weather data
  const query1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  return fetch(query1)
    .then((res) => res.json())
    .then((res) => {
      lat = res.coord.lat
      lon = res.coord.lon
      data.current.temp = res.main.temp
      data.current.humidity = res.main.humidity
      data.current.wind = res.wind.speed
      data.city = res.name

      // one call API with lat and lon for forecast
      const query2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      return fetch(query2)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          data.current.uvIndex = res.daily[0].uvi
          data.current.icon = res.daily[0].weather[0].icon
          data.current.date = convertDate(res.current.dt)
          let day = {
            humidity: res.daily[1].humidity,
            temp: res.daily[1].temp.day,
            icon: res.daily[1].weather[0].icon,
            date: convertDate(res.daily[1].dt),
          }
          data.forecast.push(day)

          day = {
            humidity: res.daily[2].humidity,
            temp: res.daily[2].temp.day,
            icon: res.daily[2].weather[0].icon,
            date: convertDate(res.daily[2].dt),
          }
          data.forecast.push(day)
          day = {
            humidity: res.daily[3].humidity,
            temp: res.daily[3].temp.day,
            icon: res.daily[3].weather[0].icon,
            date: convertDate(res.daily[3].dt),
          }
          data.forecast.push(day)
          day = {
            humidity: res.daily[4].humidity,
            temp: res.daily[4].temp.day,
            icon: res.daily[4].weather[0].icon,
            date: convertDate(res.daily[4].dt),
          }
          data.forecast.push(day)
          day = {
            humidity: res.daily[5].humidity,
            temp: res.daily[5].temp.day,
            icon: res.daily[5].weather[0].icon,
            date: convertDate(res.daily[5].dt),
          }
          data.forecast.push(day)
          return data
        })
    })
}
function setUVIColor(uvIndex) {
  if (uvIndex <= 2) {
    return 'bg-secondary text-white'
  } else if (uvIndex <= 5) {
    return 'bg-dark text-white'
  } else if (uvIndex <= 7) {
    return 'bg-success text-white'
  } else if (uvIndex <= 10) {
    return 'bg-warning text-dark'
  } else {
    return 'bg-danger text-white'
  }
}

function displayWeather(record) {
  console.log(record)

  const currentWeather = document.getElementById('current-weather')
  currentWeather.innerHTML = `<div class="card-body">
        <h2 class="d-inline-block mr-3">${record.city} ${
    record.weather.current.date
  }</h2>
        <img class="d-inline-block" src="https://openweathermap.org/img/wn/${
          record.weather.current.icon
        }@2x.png" alt="">
        <p>Temperature: ${record.weather.current.temp} &#176;C</p>
        <p>Humidity: ${record.weather.current.humidity}&#37;</p>
        <p>Wind Speed: ${record.weather.current.wind} km/h</p>
        <p>UV Index: <span id="current-uv-index" class="${setUVIColor(
          record.weather.current.uvIndex
        )} py-1 px-2 rounded">${record.weather.current.uvIndex}</span></p>
      </div>`

  const fiveDayForecastCards = document.getElementById(
    'five-day-forecast-cards'
  )
  fiveDayForecastCards.innerHTML = ''
  record.weather.forecast.forEach((day) => {
    fiveDayForecastCards.innerHTML += `<div class="col-lg">
            <div class="card bg-primary text-white">
              <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <p class="h5">${day.date}</p>
                <img class="mb-3" src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="">
                <p>Temp: ${day.temp} &#176;F</p>
                <p>Humidity: ${day.humidity}&#37;</p>
              </div>
            </div>
          </div>`
  })
}

function submitSearch(event) {
  event.preventDefault()
  const city = document
    .getElementById('city-name')
    .value.trim()
    .replace(/\s+/g, ' ')
  getWeatherData(city)
    .then((data) => {
      const record = { city: data.city, weather: data }
      history.push(record)
      return record
    })
    .then((record) => displayWeather(record))
}

document.getElementById('search-city').addEventListener('submit', submitSearch)
