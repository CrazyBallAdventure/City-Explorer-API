const axios = require('axios')

class Forecast {
    constructor(date, description, high_temp, low_temp) {
        this.date = date;
        this.description = description;
        this.high = high_temp;
        this.low = low_temp;
    }
}


async function getWeather(searchQuery){
    console.log(process.env.WEATHER_APP_API);
    let forecastData = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_APP_API}&city=${searchQuery}`);

    const forecaster = forecastData.data.data.slice(0, 3).map(obj => {
        return new Forecast(obj.valid_date, obj.weather.description, obj.high_temp, obj.low_temp);
    });

    return forecaster;
}

module.exports=getWeather