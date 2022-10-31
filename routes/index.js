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
    res.send("you have the following route as options:", "\n", "/api/add-movie", '\n', '/api/movie/:id', '\n', '/api/movie-review', '\n', '/api/review/:id');
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

module.exports = (api);