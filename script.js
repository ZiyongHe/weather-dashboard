const API_KEY = '39e2855e4e0e8e65b0ab3a0814380f2e'
let data = {
  current: {},
  first: {},
  second: {},
  third: {},
  fourth: {},
  fifth: {},
}
let history = []
let cityName

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
      cityName = res.name

      // one call API with lat and lon for forecast
      const query2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      return fetch(query2)
        .then((res) => res.json())
        .then((res) => {
          data.current.uvIndex = res.daily[0].uvi
          data.current.icon = res.daily[0].weather[0].icon
          data.current.date = convertDate(res.current.dt)

          data.first.humidity = res.daily[1].humidity
          data.first.temp = res.daily[1].temp.day
          data.first.icon = res.daily[1].weather[0].icon
          data.first.date = convertDate(res.daily[1].dt)

          data.second.humidity = res.daily[2].humidity
          data.second.temp = res.daily[2].temp.day
          data.second.icon = res.daily[2].weather[0].icon
          data.second.date = convertDate(res.daily[2].dt)

          data.third.humidity = res.daily[3].humidity
          data.third.temp = res.daily[3].temp.day
          data.third.icon = res.daily[3].weather[0].icon
          data.third.date = convertDate(res.daily[2].dt)

          data.fourth.humidity = res.daily[4].humidity
          data.fourth.temp = res.daily[4].temp.day
          data.fourth.icon = res.daily[4].weather[0].icon
          data.fourth.date = convertDate(res.daily[3].dt)

          data.fifth.humidity = res.daily[5].humidity
          data.fifth.temp = res.daily[5].temp.day
          data.fifth.icon = res.daily[5].weather[0].icon
          data.fifth.date = convertDate(res.daily[4].dt)
          return data
        })
    })
}

function submitSearch(event) {
  event.preventDefault()
  const city = document
    .getElementById('city-name')
    .value.trim()
    .replace(/\s+/g, ' ')
  getWeatherData(city).then((data) => {
    const record = { city: cityName, weather: data }
    history.push(record)
    console.log(record)
  })
}

document.getElementById('search-city').addEventListener('submit', submitSearch)
