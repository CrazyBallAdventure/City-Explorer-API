const axios = require('axios')

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

async function getMovie(searchQuery){
    let movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`);

    const movies = movieResponse.data.results.map(obj => {
        return new Movie(obj.title, obj.overview, obj.vote_average, obj.popularity, obj.release_date, obj.poster_path);
    });

    return movies;
}


module.exports=getMovie