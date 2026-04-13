const express = require('express') // require -> commonJs 
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by') // deshabilitar el header x-powered-by

// Todos loos recursos que sean movies se identifica con /movies
app.get('/movies', (req, res) => {
    const { genre} = req.query
    if (genre) {
        const fiteredMovies = movies.filter (
            movie => movie.genre.includes(genre)
        )
        return res.json(fiteredMovies)
    }
    res.json(movies)
})

app.get('/movies/:id', (req, res) => { // path-to-regexp
    const {id} = req.params
    const movie = movies.find(movie => movie.id === id)
    if (movie) return res.json(movie)
        res.status(404).json({message: 'movie not found'})
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})