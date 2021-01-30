// class DailyWeather {
//   constructor(temp, humidity, iconDesription) {
//     this.temp = temp
//     this.humidity = humidity
//     this.icon = {
//       description: iconDesription,
//     }
//   }

//   setDate(openWeatherDate) {
//     const convertedDate = new Date(openWeatherDate * 1000)

//     this.date = `(${
//       convertedDate.getMonth() + 1
//     }/${convertedDate.getDate()}/${convertedDate.getFullYear()})`
//     return this
//   }
// }

const API_KEY = '39e2855e4e0e8e65b0ab3a0814380f2e'
function getWeatherData(city) {
  let data = {
    current: {},
    first: {},
    second: {},
    third: {},
    fourth: {},
    fifth: {},
  }
  let lat
  let lon
  // for current weather data
  const query1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  fetch(query1)
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      lat = res.coord.lat
      lon = res.coord.lon
      data.current.temp = res.main.temp
      data.current.humidity = res.main.humidity
      data.current.wind = res.wind.speed

      // one call API with lat and lon for forecast
      const query2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      fetch(query2)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          data.current.uvIndex = res.daily[0].uvi
          data.first.humidity = res.daily[1].humidity
          data.first.temp = res.daily[1].temp.day
          data.second.humidity = res.daily[2].humidity
          data.second.temp = res.daily[2].temp.day
          data.third.humidity = res.daily[3].humidity
          data.third.temp = res.daily[3].temp.day
          data.fourth.humidity = res.daily[4].humidity
          data.fourth.temp = res.daily[4].temp.day
          data.fifth.humidity = res.daily[5].humidity
          data.fifth.temp = res.daily[5].temp.day
          console.log(data)
        })
    })
}

function submitSearch(event) {
  event.preventDefault()
  const city = document.getElementById('city-name').value
  getWeatherData(city.trim().replace(/\s+/g, ' '))
}

document.getElementById('search-city').addEventListener('submit', submitSearch)
