import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
    static async getAll(req, res) {
        const { genre } = req.query
        const movies = await MovieModel.getAll({ genre })
        // que es lo que renderiza la vista? -> los datos, en este caso, las peliculas
        res.json(movies)

    }

    static async getById(req, res) {
        const { id } = req.params
        const movie = await MovieModel.getById ({ id})
        if (movie) return res.json(movie)
        res.status(404).json({ message: 'movie not found' })
    }

    static async create (req, res) {
        const result = validateMovie(req.body)
    
        if (!result.success) {
            // 422 Bad Request -> el cliente envio una solicitud mal formada, en este caso, el body no cumple con el esquema definido
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
    
        const newMovie = await MovieModel.create({ input: result.data })
        res.status(201).json(newMovie)
    }

    static async delete (req, res) {
        const { id } = req.params
        const result = await MovieModel.deleteById({ id })

        if (result === false) {
        return res.status(404).json({ message: "movie not found" })
    }
        return res.json({ message: "movie deleted" })
    }


    static async update (req, res) {

        const result = validatePartialMovie(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params
        const updateMovie = await MovieModel.updateById({ id, input: result.data })
        
            return res.json(updateMovie)
        }

}
