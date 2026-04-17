import { validateMovie, validatePartialMovie } from '../schemas/movie.js'
import { Router } from 'express'
import { MovieModel } from '../models/movie.js'


export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)

moviesRouter.get('/:id', async(req, res) => {
    const { id } = req.params
    const movie = await MovieModel.getById ({ id})
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'movie not found' })
})

moviesRouter.post('/', async (req, res) => {
    const result = validateMovie(req.body)

    if (!result.success) {
        // 422 Bad Request -> el cliente envio una solicitud mal formada, en este caso, el body no cumple con el esquema definido
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ input: result.data })
    res.status(201).json(newMovie)
})

moviesRouter.delete ('/:id', async (req, res) => {
    const { id } = req.params
    
    const result = await MovieModel.delete({ id })
    
    if (result === false) {
        return res.status(404).json({ message: "movie not found" })
    }

    return res.json({ message: "movie deleted" })
})

moviesRouter.patch('/:id', async (req, res) => {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updateMovie = await MovieModel.updateById({ id, input: result.data })
   
        return res.json(updateMovie)
    })