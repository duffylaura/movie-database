const express = require('express');
const mysql = require("mysql2");
const api = require('express').Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'movie_db',
},
    console.log('Connected to movie_db')
);

api.get('/', (req, res) => {
    res.send("you have the following route as options:" + "/api/add-movie" + '/api/movie/:id' + '/api/movie-review' + '/api/review/:id');
});

api.get('/movies', (req, res) => {
    let allMovies;
    connection.query('SELECT * FROM movies', (err, respond) => {
        err ? console.error(err) : console.log('\n')
        allMovies = respond;
        console.log(allMovies);
        res.send(allMovies);
    });
});

api.get('/movie-reviews', (req, res) => {
    let allMoviesRev;
    connection.query('SELECT movies.id AS Movie_ID, movie_name AS Movie_Title, reviews.review FROM movies LEFT JOIN reviews ON reviews.movie_id = movies.id', (err, respond) => {
        err ? console.error(err) : console.log('\n')
        allMoviesRev = respond;
        console.log(allMoviesRev);
        res.send(allMoviesRev);
    });
});

api.post('/add-movie', (req, res) => {
    //grabbing the object of the request, shoudl have movie_name: new Name
    let newMovie = (req.body);
    console.log(newMovie);
    connection.query('INSERT INTO movies (movie_name) VALUES (?)', [newMovie.movie_name], (err) => {
        err ? console.error(err) : res.send(`sucessfully inserted new Movie called ${newMovie.movie_name}`);
    });
});

api.delete('/movie/:id', (req, res) => {
    let deleteMovieID = (req.params.id);
    console.log(deleteMovieID);
    connection.query('DELETE FROM movies WHERE id = ?', [deleteMovieID], (err) => {
        err ? console.error(err) : res.send(`sucessfully deleted movie ID ${deleteMovieID}`);
    });
});

api.put('/review/:id', (req, res) => {
    let newReview = (req.body.review);
    let movieID = (parseInt(req.params.id));
    console.log(newReview + "\n" + movieID);
    console.log(typeof movieID);
    connection.query('UPDATE reviews SET review = ? WHERE Movie_ID = ?', [newReview, movieID], (err) => {
        // connection.query('INSERT INTO reviews (movie_id, review) VALUES(?,?) ON DUPLICATE KEY UPDATE review', [newReview, movieID], (err) => {
        err ? console.error(err) : res.send(`sucessfully updated review for movie ID ${movieID}`);
    });

});

module.exports = (api);