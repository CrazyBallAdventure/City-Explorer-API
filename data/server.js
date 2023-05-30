"use strict";

require('dotenv').config();
const express = require("express");
const cors = require('cors');
const axios = require("axios");
const PORT = process.env.PORT || 3001;
const getWeather = require('./weather')
const getMovie = require('./movie')

// Initializes app
const app = express();

app.use(cors());

// Configure routes
app.get('/weather', async (request, response) => {
    const forecaster = await getWeather(request.query.searchQuery);
    response.send(forecaster);
});

app.get("/movies", async (request, response) => {
    let searchQuery = request.query.searchQuery;
    let movies = await getMovie(searchQuery)

    response.send(movies);
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