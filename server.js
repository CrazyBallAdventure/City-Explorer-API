"use strict"

require('dotenv').config();
const express = require("express");
const cors = require('cors');
const { response } = require('express');
const data = require('./data/weather.json');

//inilizes app
const app = express();

app.use(cors());

//configure routes
app.get('/weather', (request, response) => {
    //query parameters
    let {lat, lon, searchQuery} = request.query;
    const forecastData = data.find(destination => {
        if (lat == destination.lat || lon == destination.lon || searchQuery == destination.city_name){
            return true;
        } else {
            return false;
        }
    });
        if (forecastData === undefined){
            response.status(400).send({message:"400 Not Found"});
            return
        }

    const forecaster = forecastData.data.map(obj => {
        return new Forecast(obj.valid_date, obj.weather.description, obj.high_temp, obj.low_temp)
    });

    response.send(forecaster)
});


class Forecast {
    constructor(date, description, high_temp, low_temp) {
        this.date = date;
        this.description = description;
        this.high = high_temp;
        this.low = low_temp;
    }
}

//start app
app.listen(3001, () => console.log(`listening on 3001`));