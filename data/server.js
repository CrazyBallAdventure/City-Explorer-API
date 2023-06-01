"use strict";

require('dotenv').config();
const express = require("express");
const cors = require('cors');
const axios = require("axios");
const PORT = process.env.PORT || 3001;
const getWeather = require('./weather')
const getMovie = require('./movie')

let weathercache = {}
let moviecache = {}

// Initializes app
const app = express();

app.use(cors());

// Configure routes
app.get('/weather', async (request, response) => {
    let city = request.query.searchQuery
    let forecastData = weathercache[city]

    if(forecastData === undefined)
    {
        console.log("CACHE MISS")
        forecastData = await getWeather(request.query.searchQuery);
        weathercache[city] = forecastData
    }else{
        console.log("CACHE HIT")
    }
    response.send(forecastData)

});

app.get("/movies", async (request, response) => {
    let movie = request.query.searchQuery
    let movieData = moviecache[city]

    if(movieData === undefined)
    {
        console.log("CACHE MISS")
        movieData = await getMovie(request.query.searchQuery);
        moviecache[city] = movieData
    }else{
        console.log("CACHE HIT")
    }
    response.send(movieData)

    // let searchQuery = request.query.searchQuery;
    // let movies = await getMovie(searchQuery)

    // response.send(movies);
});




class Movie {
    constructor(title, overview, vote_average, popularity, release_date, poster_path) {
        this.title = title;
        this.overview = overview;
        this.vote_average = vote_average;
        this.popularity = popularity;
        this.release_date = release_date;
        this.poster_path = poster_path;
    }
}

class Forecast {
    constructor(date, description, high_temp, low_temp) {
        this.date = date;
        this.description = description;
        this.high = high_temp;
        this.low = low_temp;
    }
}

// Start app
app.listen(PORT, () => console.log(`listening on ${PORT}`));