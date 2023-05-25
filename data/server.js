const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
// const weatherData = require('./data/weather.json');
// const weather = require('./data/weather.json')
const dotenv = require("dotenv");
const { default: axios } = require("axios");


dotenv.config()

class Forecast {
    constructor(description, date) {
        this.date = date
        this.description = description
    };
}

app.get('/', function (request, response) {
    response.send("hello")
})
app.get("/weather", function (request, response) {
    console.log(request.query.lat)
    console.log(request.query.lon)
    console.log(request.query.searchQuery)
    // setting function called cityData that compares the entered data to specific city
    let cityData = weatherData.find(function (element) {
        if (element.city_name === request.query.searchQuery) {
            return true
        } else {
            return false
        }
    })
    // takes fuction from single argument to create a new array
    console.log(cityData)
    let ForecastData = cityData.data.map(function (element) {
        return new Forecast(element.datetime, element.weather.description)
    })
    response.send(ForecastData);
});
let headers = {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2YyYmI5NWY1YjQzYzdjNTg2NzA1M2FkNzcyNzZiNyIsInN1YiI6IjY0NjY3MmVjMmJjZjY3MDE1NTgxOWYxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DVmk4oD1fL28Si6su8HgfzzY87jaem-x3-8Cuho1s7s"
}
app.get("/movies", async function (request, response) {
    let movie = request.query.movie
    //send a request moviedb api
    //URL: https://api.themoviedb.org/3/movie
    let movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movie}`, headers = headers)
    response.send(movieResponse.data.results)
})

app.get("/weather", async function (request, response) {
    const lat = request.query.lat;
    const lon = request.query.lon;
    const searchQuery = request.query.searchQuery;

    try {
        // Make an Axios request to the weather API using the latitude and longitude
        const weatherResponse = await axios.get(
            `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${lon}&days=5`
        );

        // Extract the forecast data from the API response
        const forecastData = weatherResponse.data.forecast.forecastday.map(
            (forecast) => new Forecast(forecast.date, forecast.day.condition.text)
        );

        response.send(forecastData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        response.status(500).send("Error fetching weather data");
    }
});


// app.find('/weather', function(request, response){
//     console.log(request.query.city_name)

// })


app.listen(3001)