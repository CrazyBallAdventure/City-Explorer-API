"use strict";

require('dotenv').config();
const express = require("express");
const cors = require('cors');
const axios = require("axios");
const PORT = process.env.PORT || 3001;

// Initializes app
const app = express();

app.use(cors());

// Configure routes
app.get('/weather', async (request, response) => {
    console.log(process.env.WEATHER_APP_API);
    let forecastData = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_APP_API}&city=${request.query.searchQuery}`);

    const forecaster = forecastData.data.data.slice(0, 3).map(obj => {
        return new Forecast(obj.valid_date, obj.weather.description, obj.high_temp, obj.low_temp);
    });

    response.send(forecaster);
});

app.get("/movie", async (request, response) => {
    let movie = request.query.movie;
    let movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movie}`);

    const watcher = movieResponse.data.results.map(obj => {
        return new Movie(obj.title, obj.overview, obj.vote_average, obj.popularity, obj.release_date, obj.poster_path);
    });

    response.send(watcher);
});

class Movie {
    constructor(overview, popularity, poster_path, release_date, title, vote_average) {
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