/* 
- [ ] `movie_db` is created and contains a `movies` and `reviews` table.
- [ ] `movie_db` has been seeded with data.
- [ ] the `/api/add-movie` POST route successfully adds a movie when tested using Insomnia. (post)
- [ ] the `/api/movies` GET route renders a list of all movies. (get)
- [ ] the `/api/movie/:id` DELETE route deletes a route when tested using Insomnia. (delete)
- [ ] the `/api/movie-reviews` GET & JOIN route successfully gets all movies and the associated reiviews. (get)(join)
- [ ] the `/api/review/:id` PUT route successfully updates a review pertaining to a specific movie. (put)
*/

const express = require("express");
const mysql = require("mysql2");
const api = require('./routes');
const PORT = 3001;
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'movie_db',
},
    console.log('Connected to movie_db')
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.get('/', (req, res) => {
    res.send("please navigate to http://localhost:3001/api for list of api command")
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);