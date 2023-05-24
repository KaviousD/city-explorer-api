const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
const weatherData = require('./data/weather.json');
const weather = require('./data/weather.json')

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

// app.find('/weather', function(request, response){
//     console.log(request.query.city_name)

// })


app.listen(3001)